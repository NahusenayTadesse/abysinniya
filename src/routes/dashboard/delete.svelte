<script lang="ts">
	import { Loader, Trash } from '@lucide/svelte';

	import type { DeleteTestimonial as schema } from './schema';

	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';

	let {
		data,
		action = '/dashboard/customers?/addCustomer',
		id
	}: {
		data: SuperValidated<Infer<schema>>;
		action: string;
		id: number;
	} = $props();

	const { form, enhance, delayed, message } = superForm(data, {
		resetForm: false
	});
	import { toast } from 'svelte-sonner';

	$effect(() => {
		if ($message) {
			if ($message.type === 'error') {
				toast.error($message.text);
			} else {
				toast.success($message.text);
			}
		}
	});

	$form.id = id;

	let open = $state(false);
</script>

<button
	onclick={() => (open = !open)}
	class="text-whitetransition rounded-md border border-white/20 bg-red-500 p-1 hover:bg-zinc-200"
>
	<Trash class="size-5" />
</button>

<!-- Popover -->
{#if open}
	<div
		class="absolute top-12 right-4 z-50 w-80 rounded-2xl border border-black/5 bg-white p-5 text-black shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-200"
	>
		<h3 class="text-base font-bold text-zinc-900">Delete Message</h3>

		<p class="mt-2 text-xs leading-relaxed text-zinc-500">
			Are you sure you want to delete this item? This action is irreversible.
		</p>

		<div class="mt-4 flex items-center justify-end gap-2.5 border-t border-zinc-100 pt-3">
			<button
				type="button"
				onclick={() => (open = false)}
				class="rounded-xl border border-zinc-200 px-3.5 py-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900"
			>
				Cancel
			</button>

			<form method="post" action="?/delete" use:enhance>
				<input value={id} name="id" type="hidden" />

				<button
					type="submit"
					class="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700 active:scale-95"
				>
					{#if $delayed}
						<Loader class="size-3.5 animate-spin" />
						Deleting...
					{:else}
						<Trash class="size-3.5" />
						Delete
					{/if}
				</button>
			</form>
		</div>
	</div>
{/if}
