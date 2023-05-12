import { oysterStore } from '$lib/data-stores/oysterStore';
import { addToast } from '$lib/data-stores/toastStore';
import ENVIRONMENT from '$lib/environments/environment';
import { QUERY_TO_GET_ALL_PROVIDERS_DATA } from '$lib/utils/constants/subgraphQueries';
import { getOysterProvidersModified } from '$lib/utils/data-modifiers/oysterModifiers';
import { get } from 'svelte/store';
import type { LayoutLoad } from '../$types';
import { subgraphQueryWrapper } from '$lib/controllers/subgraphController';

export const load = (async ({ fetch }) => {
	try {
		const query = QUERY_TO_GET_ALL_PROVIDERS_DATA;
		const options: RequestInit = subgraphQueryWrapper(query, {});

		const response = await fetch(ENVIRONMENT.public_enclaves_contract_subgraph_url, options);

		if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

		const result = await response.json();
		const providers = result['data']?.providers;
		if (!providers?.length) {
			throw new Error('No providers found');
		}
		if (result?.['errors']) {
			throw new Error('Error fetching providers details from subgraph');
		}

		const allMarketplaceData = await getOysterProvidersModified(providers);
		// updating stores instead of returning data as we don't need to show this data explicitly
		oysterStore.update((store) => {
			return {
				...store,
				allMarketplaceData,
				marketplaceLoaded: true
			};
		});
		console.log('oysterStore', get(oysterStore));
	} catch (error) {
		console.error(error);
		addToast({
			message: 'Error fetching provider details. Please try again later.',
			variant: 'error'
		});
		return { error: 'Unable to fetch provider details' };
	}
}) satisfies LayoutLoad;
