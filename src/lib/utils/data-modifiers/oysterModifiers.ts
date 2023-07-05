import { BIG_NUMBER_ZERO, SECONDS_IN_HUNDRED_YEARS } from '$lib/utils/constants/constants';
import type {
	CPInstances,
	CPUrlDataModel,
	OysterInventoryDataModel,
	OysterMarketplaceDataModel
} from '$lib/types/oysterComponentType';
import {
	OYSTER_RATE_METADATA,
	OYSTER_RATE_SCALING_FACTOR
} from '$lib/utils/constants/oysterConstants';
import { getProvidersInstancesJSON, getProvidersNameJSON } from '$lib/controllers/httpController';

import { BANDWIDTH_RATES_LOOKUP } from '$lib/page-components/oyster/data/bandwidthRates';
import { BigNumber } from 'ethers';
import { instanceVcpuMemoryData } from '$lib/page-components/oyster/data/instanceVcpuMemoryData';

export const parseMetadata = (metadata: string) => {
	//remove unwanted single quote and \
	metadata = metadata.replaceAll("'", '');
	metadata = metadata.replaceAll('\\', '');

	const metadataParsed = metadata ? JSON.parse(metadata) : {};
	const { url, instance, region } = metadataParsed ?? {};
	const { vcpu, memory } = getvCpuMemoryData(instance);

	return {
		enclaveUrl: url,
		instance,
		region,
		vcpu,
		memory
	};
};

export const getvCpuMemoryData = (instance: string) => {
	const vcpuMemoryData = instanceVcpuMemoryData.find((item) => item[0] === instance);
	const memory = vcpuMemoryData?.[1];
	const vcpu = vcpuMemoryData?.[2];
	return {
		vcpu,
		memory
	};
};

export const getBandwidthRateForRegion = (region: string) => {
	const bandwidthRate = BANDWIDTH_RATES_LOOKUP[region] ?? 0;
	return BigNumber.from(bandwidthRate);
};

export async function modifyOysterJobData(jobs: any[]) {
	if (!jobs?.length) return [];

	const names = await getProvidersNameJSON();

	return jobs.map((job: any) => {
		return modifyJobData(job, names);
	}) as OysterInventoryDataModel[];
}

const modifyJobData = (job: any, names: any): OysterInventoryDataModel => {
	const {
		metadata,
		id,
		owner,
		rate = '0',
		provider,
		createdAt,
		totalDeposit = '0',
		lastSettled,
		balance = '0',
		refund = '0',
		settlementHistory = [],
		depositHistory = [],
		rateRevisionHistory = []
	} = job ?? {};

	const nowTime = Math.floor(Date.now() / 1000);
	const _lastSettled = Number(lastSettled);
	const _createdAt = Number(createdAt);

	let reviseRateMap: OysterInventoryDataModel['reviseRate'];

	if (rateRevisionHistory?.length > 0) {
		const { value, updatesAt } = rateRevisionHistory[0];
		const _rateUpdatesAt = Number(updatesAt);
		const _rateStatus = _rateUpdatesAt > nowTime ? 'pending' : 'completed';
		reviseRateMap = {
			newRate: BigNumber.from(value),
			rateStatus: _rateStatus,
			stopStatus: BigNumber.from(value).gt(BIG_NUMBER_ZERO) ? 'disabled' : _rateStatus,
			updatesAt: Number(updatesAt)
		};
	}

	const { enclaveUrl, instance, region, vcpu, memory } = parseMetadata(metadata);

	//convert to BigNumber
	const _totalDeposit = BigNumber.from(totalDeposit);
	const _balance = BigNumber.from(balance);
	const _rate = BigNumber.from(rate); // in seconds
	const _refund = BigNumber.from(refund);
	const _downScaledRate = _rate.div(OYSTER_RATE_SCALING_FACTOR);

	//job with all basic conversions
	const modifiedJob = {
		provider: {
			name: names[provider] ?? '',
			address: provider
		},
		owner,
		metadata,
		enclaveUrl,
		instance,
		region,
		vcpu,
		memory,
		refund: _refund,
		rate: _rate,
		downScaledRate: _downScaledRate,
		totalDeposit: _totalDeposit,
		lastSettled: Number(lastSettled),
		createdAt: Number(createdAt),
		id,
		reviseRate: reviseRateMap,
		settlementHistory: settlementHistory.map((settlement: any) => {
			return {
				...settlement,
				amount: BigNumber.from(settlement.amount),
				timestamp: Number(settlement.timestamp)
			};
		}),
		depositHistory: depositHistory.map((deposit: any, i: number) => {
			return {
				...deposit,
				amount: BigNumber.from(deposit.amount),
				timestamp: Number(deposit.timestamp),
				transactionStatus:
					_refund.gt(BIG_NUMBER_ZERO) && i === 0
						? 'refunded'
						: deposit.isWithdrawal
						? 'withdrawal'
						: 'deposit'
			};
		})
	};

	const _totalSettledAmount = settlementHistory.reduce((acc: BigNumber, settlement: any) => {
		return acc.add(BigNumber.from(settlement.amount));
	}, BIG_NUMBER_ZERO);

	if (_totalDeposit.eq(_totalSettledAmount) && _balance.eq(BIG_NUMBER_ZERO)) {
		// job is settled so amount used is total deposit and current balance is 0
		return {
			...modifiedJob,
			amountUsed: _totalDeposit,
			balance: BIG_NUMBER_ZERO,
			durationLeft: 0,
			durationRun: _lastSettled - _createdAt,
			endEpochTime: _lastSettled,
			live: true,
			status: 'settled',
			amountToBeSettled: BIG_NUMBER_ZERO
		};
	}

	if (_refund.gt(BIG_NUMBER_ZERO)) {
		//job is stopped and refunded so amount is used is total deposit - refund and current balance is 0
		return {
			...modifiedJob,
			amountUsed: _totalDeposit.sub(_refund),
			balance: BIG_NUMBER_ZERO,
			durationLeft: 0,
			durationRun: _lastSettled - _createdAt,
			endEpochTime: _lastSettled,
			live: false,
			status: 'stopped',
			amountToBeSettled: _totalDeposit.sub(_refund).sub(_totalSettledAmount)
		};
	}

	if (_rate.eq(BIG_NUMBER_ZERO) || _balance.div(_downScaledRate).gt(SECONDS_IN_HUNDRED_YEARS)) {
		const time = Math.floor(nowTime - _lastSettled);
		const _balanceUpdated = _balance.sub(_downScaledRate.mul(time));
		//job is running and will never end
		return {
			...modifiedJob,
			amountUsed: _totalDeposit.sub(_balanceUpdated),
			balance: _balanceUpdated,
			durationLeft: SECONDS_IN_HUNDRED_YEARS * 2,
			durationRun: nowTime - _createdAt,
			endEpochTime: _lastSettled + SECONDS_IN_HUNDRED_YEARS * 2,
			live: true,
			status: 'running',
			amountToBeSettled: _totalDeposit.sub(_balanceUpdated).sub(_totalSettledAmount)
		};
	}

	//job is running or has completed
	const _paidDuration = _balance.mul(OYSTER_RATE_SCALING_FACTOR).div(_rate).toNumber();
	const endEpochTime = _lastSettled + _paidDuration;

	if (endEpochTime < nowTime) {
		//job is completed
		return {
			...modifiedJob,
			amountUsed: _totalDeposit,
			balance: BIG_NUMBER_ZERO,
			durationLeft: 0,
			durationRun: endEpochTime - _createdAt,
			endEpochTime,
			live: false,
			status: 'completed',
			amountToBeSettled: _totalDeposit.sub(_totalSettledAmount)
		};
	}

	let currentBalance = _balance;
	//job is running
	const time = Math.floor(nowTime - _lastSettled);
	currentBalance = _balance.sub(_rate.mul(time).div(OYSTER_RATE_SCALING_FACTOR));

	return {
		...modifiedJob,
		amountUsed: _totalDeposit.sub(currentBalance),
		balance: currentBalance,
		durationLeft: _paidDuration - (nowTime - _lastSettled),
		durationRun: nowTime - _createdAt,
		endEpochTime,
		live: true,
		status: 'running',
		amountToBeSettled: _totalDeposit.sub(currentBalance).sub(_totalSettledAmount)
	};
};

export async function getOysterProvidersModified(providers: any[]) {
	if (!providers?.length) return [];
	const { rateCPUrlUnitInSeconds } = OYSTER_RATE_METADATA;
	//fetch all providers name and instances
	const [allNames, allInstances] = await Promise.all([
		getProvidersNameJSON(),
		getProvidersInstancesJSON()
	]);
	const ret: OysterMarketplaceDataModel[] = [];

	providers.forEach((provider) => {
		const instances = getModifiedInstances(allInstances[provider.id]);
		instances?.forEach((instance: any, index: number) => {
			//rate is hourly rate so convert it to per second rate
			const rateFromCPUrl = instance.rate ? BigNumber.from(instance.rate) : BIG_NUMBER_ZERO;
			ret.push({
				...instance,
				rate: rateFromCPUrl.div(rateCPUrlUnitInSeconds),
				provider: {
					name: allNames[provider.id] ?? '',
					address: provider.id
				},
				id: `${provider.id}-${index}`
			});
		});
	});
	return ret;
}

export const getModifiedInstances = (instances?: CPInstances) => {
	const { min_rates } = instances ?? { min_rates: [] };
	// transforming response data so that each object in the array
	// corresponds to a row in the table
	const ret: CPUrlDataModel[] = min_rates?.flatMap((region) => {
		return region.rate_cards.map((rate) => {
			const { vcpu, memory } = getvCpuMemoryData(rate.instance);
			return {
				instance: rate.instance,
				region: region.region,
				rate: BigNumber.from(rate.min_rate),
				vcpu,
				memory
			};
		});
	});
	return ret;
};
