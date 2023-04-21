import type { TableModel } from '$lib/types/componentTypes';

//
export const kOysterOwnerInventory = '/oyster/inventory';
export const kOysterOwnerHistory = '/oyster/history';

//merchant pages
export const kMerchantJobs = '/oyster/operator/jobs';
export const kMerchantHistory = '/oyster/operator/history';

export const kOysterRateMetaData = {
	currency: 'USDC',
	symbol: '$',
	decimal: 18,
	rateUnit: 'hour',
	rateUnitInSeconds: 3600,
	userDurationUnit: 'day',
	userDurationUnitInRateUnit: 24
};

export const oysterTableItemsPerPage = 10;

export const kInstancesTableHeader: TableModel['header'][] = [
	{
		title: 'Instance Type',
		id: 'type'
	},
	{
		title: 'Region',
		id: 'region',
		tooltipText: 'The amount of POND which was placed for conversion to MPond.'
	},
	{
		title: 'Price',
		id: 'price',
		tooltipText:
			'The corresponding amount of MPond received as a result of the conversion from POND. Note: 1 Million POND equals 1 MPond.'
	}
];

export const kOysterMerchantJobTableHeader: TableModel['header'][] = [
	{
		title: 'USER',
		id: 'user',
		sorting: true
	},
	{
		title: 'INSTANCE',
		id: 'instance'
	},
	{
		title: 'REGION',
		id: 'region'
	},
	{
		title: 'STARTED',
		id: 'started'
	},
	{
		title: 'DURATION RUN',
		id: 'duration'
	},
	{
		title: 'ACCRUED',
		id: 'accrued'
	},
	{
		title: 'STATUS',
		id: 'status',
		sorting: true
	},
	{
		title: '',
		id: 'action'
	}
];

export const kOysterMerchantJobTableColumnsWidth = (id: string) => {
	switch (id) {
		case 'user':
			return '17.5%';
		case 'instance':
			return '10%';
		case 'region':
			return '10%';
		case 'started':
			return '12.5%';
		case 'duration':
			return '12.5%';
		case 'accrued':
			return '12.5%';
		case 'status':
			return '12.5%';
		default:
			return '12.5%';
	}
};

// make sure the id matches the id in Data Model
export const kOysterInventoryTableHeader: TableModel['header'][] = [
	{
		title: 'OPERATOR',
		id: 'provider'
	},
	{
		title: 'INSTANCE',
		id: 'instance',
		sorting: true
	},
	{
		title: 'REGION',
		id: 'region',
		sorting: true
	},
	{
		title: 'HOURLY RATE',
		id: 'rate',
		sorting: true
	},
	{
		title: 'vCPU',
		id: 'vcpu',
		tooltipText: 'The number of vCPU(s) allocated to the instance.',
		sorting: true
	},
	{
		title: 'MEMORY',
		id: 'memory',
		tooltipText: 'The amount of memory allocated to the instance.',
		sorting: true
	},
	{
		title: 'BALANCE',
		id: 'balance',
		sorting: true
	},
	{
		title: 'DURATION LEFT',
		id: 'durationLeft',
		sorting: true
	},
	{
		title: '',
		id: 'action'
	}
];

export const kInventoryTableColumnsWidth = (id: string) => {
	switch (id) {
		case 'provider':
			return '17.5%';
		case 'instance':
			return '10%';
		case 'region':
			return '10%';
		case 'rate':
			return '10%';
		case 'vcpu':
			return '10%';
		case 'memory':
			return '12.5%';
		case 'balance':
			return '10%';
		case 'durationLeft':
			return '15%';
		case 'action':
			return '5%';
		default:
			return '5%';
	}
};

export const kOysterPaymentHistoryTableHeader: TableModel['header'][] = [
	{
		title: 'DATE',
		id: 'date'
	},
	{
		title: 'AMOUNT',
		id: 'amount'
	},
	{
		title: 'TX HASH',
		id: 'txHash'
	}
];

export const kOysterHistoryTableHeader: TableModel['header'][] = [
	{
		title: 'OPERATOR',
		id: 'provider'
	},
	{
		title: 'INSTANCE',
		id: 'instance',
		sorting: true
	},
	{
		title: 'REGION',
		id: 'region',
		sorting: true
	},
	{
		title: 'AMOUNT PAID',
		id: 'totalDeposit',
		sorting: true
	},
	{
		title: 'AMOUNT USED',
		id: 'amountUsed',
		sorting: true
	},
	{
		title: 'REFUND',
		id: 'refund',
		sorting: true
	},
	{
		title: 'DURATION RUN',
		id: 'durationRun',
		sorting: true
	},
	{
		title: 'STATUS',
		id: 'status',
		sorting: true
	},
	{
		title: '',
		id: 'action'
	}
];

export const kHistoryTableColumnsWidth = (id: string) => {
	switch (id) {
		case 'provider':
			return '20%';
		case 'instance':
			return '10%';
		case 'region':
			return '10%';
		case 'totalDeposit':
			return '10%';
		case 'amountUsed':
			return '10%';
		case 'refund':
			return '10%';
		case 'durationRun':
			return '10%';
		case 'status':
			return '12.5%';
		case 'action':
			return '7.5%';
		default:
			return '0%';
	}
};

export const kOysterDocLink = 'https://docs.marlin.org/docs/User%20Guides/Oyster/';
export const kOysterSupportLink = 'https://docs.marlin.org/docs/category/tutorials';
