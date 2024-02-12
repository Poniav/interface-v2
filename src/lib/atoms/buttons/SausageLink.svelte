<script>
	import { staticImages } from '$lib/components/images/staticImages';

	export let href = '/';
	export let text = 'Get your on-chain domain with 3DNS';
</script>

<a
	class="flex w-fit items-center gap-2 rounded-lg bg-white px-4 py-3 hover:bg-white/75"
	{href}
	target="_blank"
>
	<div class="mr-1 flex flex-col items-start text-sm font-medium">
		<span class="">{text}</span>
	</div>
	<img class="my-auto" src={staticImages.OpenInNew} alt="Open" />
</a>
