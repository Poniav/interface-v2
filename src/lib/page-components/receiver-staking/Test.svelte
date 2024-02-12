<script lang="ts">
	import ModalButton from '$lib/atoms/modals/ModalButton.svelte';

	import { getReceiverPondBalanceFromSubgraph } from '$lib/controllers/subgraphController';
	import { chainConfigStore, chainStore } from '$lib/data-stores/chainProviderStore';
	import { addToast } from '$lib/data-stores/toastStore';
	import { connected, walletBalanceStore, walletStore } from '$lib/data-stores/walletProviderStore';
	import { environment } from '$lib/data-stores/environment';
	import { MESSAGES } from '$lib/utils/constants/messages';
	import { contractAddressStore } from '$lib/data-stores/contractStore';
	import {
		depositStakingToken,
		withdrawStakingToken
	} from '$lib/controllers/contract/receiverStaking';
	import { approveToken } from '$lib/controllers/contract/token';
	import { doNothing } from '$lib/utils/helpers/commonHelper';
	import { epochToDurationString } from '$lib/utils/helpers/conversionHelper';
	import AddTokenPrompt from '$lib/components/prompts/AddTokenPrompt.svelte';
	import { staticImages } from '$lib/components/images/staticImages';
	import { buttonClasses } from '$lib/atoms/componentClasses';

	let pageTitle = 'Marlin Receiver Staking Portal (Ignore this part)';
	let epochNumber = 0;

	function onClickHandlerForToastError() {
		addToast({
			message: MESSAGES.TOAST.ACTIONS.APPROVE.POND(11),
			variant: 'error'
		});
	}
	function onClickHandlerForToastInfo() {
		addToast({
			message: 'Hello, World!, Again',
			variant: 'info'
		});
	}
	function onClickHandlerForToastSuccess() {
		addToast({
			message: 'Hello, World!, Again',
			variant: 'success',
			dismissible: false
		});
	}
</script>

<div>
	<h2 class="my-5 text-2xl font-bold text-primary">{pageTitle}</h2>
	<div>Environment: {environment.environment_name}</div>
	{#if $connected}
		<div>Address: {$walletStore.address}</div>
		<div>POND Balance: {$walletBalanceStore.pond}</div>
		<div>MPond Balance: {$walletBalanceStore.mpond}</div>
		<div>Chain ID: {$chainStore.chainId}</div>
	{:else}
		The wallet is not connected.
	{/if}
	<div>Contract Address Details</div>
	<p class="break-words">{JSON.stringify($contractAddressStore)}</p>
	<button
		class="btn btn-secondary"
		on:click={() => getReceiverPondBalanceFromSubgraph($walletStore.address)}
		>Fetch receiver pond balance</button
	>
	<div>Check console for response</div>
	<button
		class="btn btn-secondary"
		on:click={() =>
			$chainConfigStore.tokens?.POND
				? approveToken($chainConfigStore.tokens.POND, BigInt(500), $contractAddressStore.POND)
				: doNothing()}>Approve 50 pond from POND contract</button
	>
	<div>Check console for response</div>
	<button class="btn btn-secondary" on:click={() => depositStakingToken(BigInt(5))}
		>Deposit 5 POND to receiver staking contract</button
	>
	<div>Check console for response</div>
	<button class="btn btn-secondary" on:click={() => withdrawStakingToken(BigInt(5))}
		>Withdraw 5 POND from receiver staking contract</button
	>
	<div>Check console for response</div>
	<button class="btn btn-secondary" on:click={() => onClickHandlerForToastError()}
		>Add a new snackbar</button
	>
	<button class="btn btn-secondary" on:click={() => onClickHandlerForToastInfo()}
		>Add a new snackbar</button
	>
	<button class="btn btn-secondary" on:click={() => onClickHandlerForToastSuccess()}
		>Add a new snackbar</button
	>
	<div>Modal Buttons to control modal (uses label element under the hood)</div>
	<div class="flex justify-center gap-3">
		<ModalButton disabled={true} styleClass="w-fit" modalFor="connect-wallet-modal"
			>this is a modal button</ModalButton
		>
		<ModalButton styleClass="w-fit" modalFor="connect-wallet-modal"
			>this is a modal button</ModalButton
		>
		<ModalButton variant="outlined" styleClass="w-fit" modalFor="connect-wallet-modal"
			>this is a modal button</ModalButton
		>
	</div>
	<input bind:value={epochNumber} type="number" />
	<br />
	{epochToDurationString(epochNumber)}
	<div class="mb-28 flex justify-center gap-3">
		<AddTokenPrompt />
	</div>

	<div class="mt-[1000px] flex justify-center gap-6">
		<div>
			<a
				class="flex w-fit items-center gap-3 rounded-xl bg-white px-5 py-6 hover:bg-white/75"
				href="/"
			>
				<!-- <img class="h-11" src={staticImages.ArbitrumLogo} alt="some logo bs" /> -->
				<div class="mr-2 flex items-start text-sm">
					<span class="">Get your on-chain domain with 3DNS</span>
				</div>
				<img class="mb-auto" src={staticImages.OpenInNew} alt="Open" />
			</a>
			<div class="my-8"></div>
			<a
				class="flex w-fit min-w-[280px] flex-col gap-4 rounded-xl bg-white px-6 py-5 hover:bg-white/75"
				href="/"
			>
				<div class="flex items-start justify-between">
					<!-- <img class="h-11" src={staticImages.ArbitrumLogo} alt="some logo bs" /> -->
					<img src={staticImages.OpenInNew} alt="Open" />
				</div>
				<div class="mr-2 flex flex-col items-start text-sm">
					<span class="font-medium">Personalise your site</span><span
						>create a free domain on xyz</span
					>
				</div>
			</a>
			<div class="my-8"></div>
			<a
				class="flex w-fit min-w-[280px] flex-col gap-2 rounded-xl bg-white px-6 py-5 hover:bg-white/75"
				href="/"
			>
				<div class="flex items-start">
					<!-- <img class="h-9" src={staticImages.ArbitrumLogo} alt="some logo bs" /> -->
				</div>
				<div class="flex items-center justify-between">
					<span class="text-lg">Documentation</span>
					<div class="rounded-md bg-base-300 p-3">
						<img class="h-3" src={staticImages.OpenInNew} alt="Open" />
					</div>
				</div>
			</a>
		</div>
		<div>
			<a class="btn-lightblue flex w-fit items-center gap-3 rounded-xl px-5 py-6" href="/">
				<!-- <img class="h-11" src={staticImages.ArbitrumLogo} alt="some logo bs" /> -->
				<div class="mr-2 flex flex-col items-start text-sm">
					<span class="font-medium">Personalise your site</span><span>create a free domain</span>
				</div>
				<img class="mb-auto" src={staticImages.OpenInNew} alt="Open" />
			</a>
			<div class="my-8"></div>
			<a
				class="btn-lightblue flex w-fit min-w-[280px] flex-col gap-4 rounded-xl px-6 py-5"
				href="/"
			>
				<div class="flex items-start justify-between">
					<!-- <img class="h-11" src={staticImages.ArbitrumLogo} alt="some logo bs" /> -->
					<img src={staticImages.OpenInNew} alt="Open" />
				</div>
				<div class="mr-2 flex flex-col items-start text-sm">
					<span class="font-medium">Personalise your site</span><span
						>create a free domain on xyz</span
					>
				</div>
			</a>
			<div class="my-8"></div>
			<a
				class="btn-lightblue flex w-fit min-w-[280px] flex-col gap-2 rounded-xl px-6 py-5"
				href="/"
			>
				<div class="flex items-start">
					<!-- <img class="h-9" src={staticImages.ArbitrumLogo} alt="some logo bs" /> -->
				</div>
				<div class="flex items-center justify-between">
					<span class="text-lg">Documentation</span>
					<div class="rounded-md bg-base-300 p-3">
						<img class="h-3" src={staticImages.OpenInNew} alt="Open" />
					</div>
				</div>
			</a>
		</div>
	</div>

	<div class="mb-96"></div>
</div>
