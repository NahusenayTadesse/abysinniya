<script lang="ts">
	import type { MarkRead as schema } from './schema';

	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import { CircleCheckBig, Loader } from '@lucide/svelte';

	let {
		data,
		id
	}: {
		data: SuperValidated<Infer<schema>>;
		id: number;
	} = $props();

	const { form, enhance, delayed } = superForm(data, {
		resetForm: false,
		onUpdated: (event) => {
			if (event.form.message) {
				if (event.form.message.type === 'error') {
					toast.error(event.form.message.text);
				} else {
					toast.success(event.form.message.text);
				}
			}
		}
	});
	import { toast } from 'svelte-sonner';

	$form.id = id;
</script>

<form
	method="post"
	id="read-{id}"
	class="-mt-4 flex h-full flex-col items-start justify-start"
	action="?/read"
	use:enhance
>
	<button type="submit" class="mt-4" form="read-{id}">
		{#if $delayed}
			<Loader class="size-4 animate-spin" />
			Marking as Read...
		{:else}
			<CircleCheckBig /> Mark as Read
		{/if}
	</button>
	<input value={$form.id} name="id" type="hidden" />
</form>
