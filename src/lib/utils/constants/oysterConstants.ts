import type { TableModel } from '$lib/types/componentTypes';
import type { OysterInventoryDataModel } from '$lib/types/oysterComponentType';
import { BigNumber } from 'ethers';

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

// Merchant, Region, Instance, Rate, Amount Paid, Amount Used, Balance, Duration Left, Status
export const kOysterInventoryTableHeader: TableModel['header'][] = [
	{
		title: 'Merchant',
		id: 'merchant'
	},
	{
		title: 'Instance',
		id: 'instance'
	},
	{
		title: 'Region',
		id: 'region'
	},
	{
		title: 'Rate',
		id: 'rate',
		sorting: true
	},
	{
		title: 'Amount Paid',
		id: 'amountPaid',
		sorting: true
	},
	{
		title: 'Amount Used',
		id: 'amountUsed',
		sorting: true
	},
	{
		title: 'Balance',
		id: 'balance',
		sorting: true
	},
	{
		title: 'Duration Left',
		id: 'durationLeft',
		sorting: true
	},
	{
		title: 'Status',
		id: 'status'
	}
];

//TODO: remove this later
export const inventoryData: OysterInventoryDataModel[] = [
	{
		merchant: {
			name: 'InfStones',
			address: '0x0000000000000000000000000000'
		},
		instance: 't2.micro',
		region: 'Germany',
		rate: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		amountPaid: {
			amount: BigNumber.from('3000000000000000000'),
			symbol: '$'
		},
		amountUsed: {
			amount: BigNumber.from('2000000000000000000'),
			symbol: '$'
		},
		balance: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		durationLeft: 1112222,
		status: 'Active'
	},
	{
		merchant: {
			name: 'InfStones',
			address: '0x0000000000000000000000000000'
		},
		instance: 't2.micro',
		region: 'Germany',
		rate: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		amountPaid: {
			amount: BigNumber.from('3000000000000000000'),
			symbol: '$'
		},
		amountUsed: {
			amount: BigNumber.from('2000000000000000000'),
			symbol: '$'
		},
		balance: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		durationLeft: 12222,
		status: 'Active'
	},
	{
		merchant: {
			name: 'InfStones',
			address: '0x0000000000000000000000000000'
		},
		instance: 't2.micro',
		region: 'Germany',
		rate: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		amountPaid: {
			amount: BigNumber.from('3000000000000000000'),
			symbol: '$'
		},
		amountUsed: {
			amount: BigNumber.from('2000000000000000000'),
			symbol: '$'
		},
		balance: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		durationLeft: 111222,
		status: 'Inactive'
	},
	{
		merchant: {
			name: 'InfStones',
			address: '0x0000000000000000000000000000'
		},
		instance: 't2.micro',
		region: 'Germany',
		rate: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		amountPaid: {
			amount: BigNumber.from('3000000000000000000'),
			symbol: '$'
		},
		amountUsed: {
			amount: BigNumber.from('2000000000000000000'),
			symbol: '$'
		},
		balance: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		durationLeft: 111222,
		status: 'Inactive'
	},
	{
		merchant: {
			name: 'InfStones',
			address: '0x0000000000000000000000000000'
		},
		instance: 't2.micro',
		region: 'France',
		rate: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		amountPaid: {
			amount: BigNumber.from('3000000000000000000'),
			symbol: '$'
		},
		amountUsed: {
			amount: BigNumber.from('2000000000000000000'),
			symbol: '$'
		},
		balance: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		durationLeft: 11341222,
		status: 'Active'
	},
	{
		merchant: {
			name: 'InfStones',
			address: '0x0000000000000000000000000000'
		},
		instance: 't2.micro',
		region: 'Germany',
		rate: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		amountPaid: {
			amount: BigNumber.from('3000000000000000000'),
			symbol: '$'
		},
		amountUsed: {
			amount: BigNumber.from('2000000000000000000'),
			symbol: '$'
		},
		balance: {
			amount: BigNumber.from('1000000000000000000'),
			symbol: '$'
		},
		durationLeft: 111222,
		status: 'Inactive'
	}
];

export const kOysterDocLink = 'https://docs.marlin.org/docs/User%20Guides/Oyster/';
export const kOysterSupportLink = 'https://docs.marlin.org/docs/category/tutorials';
