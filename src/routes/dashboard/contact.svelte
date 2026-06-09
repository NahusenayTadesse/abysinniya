<script lang="ts">
	type ContactMessage = {
		id: string;
		createdAt?: Date | number | string;
		fullName: string;
		email?: string | null;
		phone?: string | null;
		company?: string | null;
		country?: string | null;
		packageSelected?: string | null;
		inquiryType?: string | null;
		campaignGoal?: string | null;
		productType?: string | null;
		budgetRange?: string | null;
		launchDate?: Date | number | string | null;
		message?: string | null;
		source?: string | null;
		status?: string | null;
		notes?: string | null;
		seen?: boolean;
	};

	import type { DeleteTestimonial as schema, MarkRead as readSchema } from './schema';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';

	import Read from './read.svelte';
	import Delete from './delete.svelte';

	let {
		messages = [],
		deleteForm,
		readForm
	}: {
		messages: ContactMessage[];
		deleteForm: SuperValidated<Infer<schema>>;
		readForm: SuperValidated<Infer<readSchema>>;
	} = $props();
</script>

<svelte:head>
	<style>
		:root {
			--red: #c42a0c;
			--red-deep: #9a1c04;
			--orange: #f08a1d;
			--amber: #f9bc47;
			--gold: #eba417;
			--gold-soft: #dcb33d;
			--green: #3a8a12;
			--green-mid: #2e6c0b;
			--green-deep: #16400f;
			--ink: #070b07;
			--glass: rgba(255, 255, 255, 0.055);
			--glass-2: rgba(255, 255, 255, 0.04);
			--stroke: rgba(255, 255, 255, 0.14);
			--stroke-soft: rgba(255, 255, 255, 0.09);
			--txt: #f3f1ea;
			--muted: #a9b2a4;
			--muted-2: #8a937f;
			--brand-grad: linear-gradient(
				90deg,
				var(--red) 0%,
				var(--orange) 30%,
				var(--gold) 52%,
				var(--green) 100%
			);
		}
	</style>
</svelte:head>

<div class="min-h-screen bg-[var(--ink)] p-6 text-[var(--txt)]">
	<div class="pointer-events-none fixed inset-0 overflow-hidden">
		<div class="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[var(--red)]/20 blur-3xl"></div>
		<div class="absolute top-20 right-0 h-96 w-96 rounded-full bg-[var(--gold)]/20 blur-3xl"></div>
		<div
			class="absolute bottom-0 left-1/2 h-96 w-96 rounded-full bg-[var(--green)]/20 blur-3xl"
		></div>
	</div>

	<div class="relative mx-auto max-w-7xl">
		<div class="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
			<div>
				<div class="mb-3 h-1.5 w-32 rounded-full bg-[image:var(--brand-grad)]"></div>

				<h1 class="text-4xl font-black tracking-tight text-[var(--txt)]">Leads</h1>

				<p class="mt-2 text-sm text-[var(--muted)]">Customer inquiries and support requests</p>
			</div>

			<div class="flex gap-4">
				<div
					class="rounded-3xl border border-[var(--stroke)] bg-[var(--glass)] px-6 py-4 shadow-2xl backdrop-blur-xl"
				>
					<p class="text-xs font-semibold tracking-widest text-[var(--muted-2)] uppercase">Total</p>
					<p class="mt-1 text-3xl font-black text-[var(--amber)]">{messages.length}</p>
				</div>

				<div
					class="rounded-3xl border border-[var(--stroke)] bg-[var(--glass)] px-6 py-4 shadow-2xl backdrop-blur-xl"
				>
					<p class="text-xs font-semibold tracking-widest text-[var(--muted-2)] uppercase">
						Unread
					</p>
					<p class="mt-1 text-3xl font-black text-[var(--orange)]">
						{messages.filter((m) => !m.seen).length}
					</p>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
			{#each messages as message (message.id)}
				<div
					class={`group relative overflow-hidden rounded-[2rem] border shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${
						message.seen
							? 'border-[var(--stroke-soft)] bg-[var(--glass-2)]'
							: 'border-[var(--gold)]/40 bg-[var(--glass)] shadow-[0_0_45px_rgba(235,164,23,0.16)]'
					}`}
				>
					<div class="absolute inset-x-0 top-0 h-1 bg-[image:var(--brand-grad)]"></div>

					{#if !message.seen}
						<div
							class="absolute top-5 right-5 h-3 w-3 rounded-full bg-[var(--amber)] shadow-[0_0_24px_rgba(249,188,71,0.95)]"
						></div>
					{/if}

					<div class="p-6">
						<div class="mb-6 flex items-start gap-4">
							<div
								class="flex h-14 w-14 items-center justify-center rounded-2xl bg-[image:var(--brand-grad)] text-lg font-black text-white uppercase shadow-lg"
							>
								{message.fullName.charAt(0)}
							</div>

							<div class="min-w-0 flex-1">
								<div class="flex items-center gap-2">
									<h2 class="truncate text-lg font-bold text-[var(--txt)]">
										{message.fullName}
									</h2>

									<span
										class={`rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide ${
											message.seen
												? 'border-[var(--green)]/40 bg-[var(--green)]/15 text-[var(--gold-soft)]'
												: 'border-[var(--amber)]/40 bg-[var(--amber)]/15 text-[var(--amber)]'
										}`}
									>
										{message.seen ? 'Seen' : 'New'}
									</span>
								</div>

								{#if message.email}
									<p class="truncate text-sm text-[var(--muted)]">{message.email}</p>
								{/if}

								{#if message.phone}
									<p class="mt-1 text-xs text-[var(--muted-2)]">{message.phone}</p>
								{/if}
							</div>
						</div>

						<div class="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
							{#if message.company}
								<div class="rounded-2xl border border-[var(--stroke-soft)] bg-black/20 p-3">
									<p class="text-xs tracking-wider text-[var(--muted-2)] uppercase">Company</p>
									<p class="text-sm font-semibold text-[var(--txt)]">{message.company}</p>
								</div>
							{/if}

							{#if message.country}
								<div class="rounded-2xl border border-[var(--stroke-soft)] bg-black/20 p-3">
									<p class="text-xs tracking-wider text-[var(--muted-2)] uppercase">Country</p>
									<p class="text-sm font-semibold text-[var(--txt)]">{message.country}</p>
								</div>
							{/if}

							{#if message.packageSelected}
								<div class="rounded-2xl border border-[var(--stroke-soft)] bg-black/20 p-3">
									<p class="text-xs tracking-wider text-[var(--muted-2)] uppercase">Package</p>
									<p class="text-sm font-semibold text-[var(--txt)]">{message.packageSelected}</p>
								</div>
							{/if}

							{#if message.inquiryType}
								<div class="rounded-2xl border border-[var(--stroke-soft)] bg-black/20 p-3">
									<p class="text-xs tracking-wider text-[var(--muted-2)] uppercase">Inquiry Type</p>
									<p class="text-sm font-semibold text-[var(--txt)]">{message.inquiryType}</p>
								</div>
							{/if}

							{#if message.productType}
								<div class="rounded-2xl border border-[var(--stroke-soft)] bg-black/20 p-3">
									<p class="text-xs tracking-wider text-[var(--muted-2)] uppercase">Product Type</p>
									<p class="text-sm font-semibold text-[var(--txt)]">{message.productType}</p>
								</div>
							{/if}

							{#if message.budgetRange}
								<div class="rounded-2xl border border-[var(--stroke-soft)] bg-black/20 p-3">
									<p class="text-xs tracking-wider text-[var(--muted-2)] uppercase">Budget</p>
									<p class="text-sm font-semibold text-[var(--amber)]">{message.budgetRange}</p>
								</div>
							{/if}
						</div>

						{#if message.campaignGoal}
							<div class="mb-5 rounded-2xl border border-[var(--gold)]/20 bg-[var(--gold)]/10 p-4">
								<p class="mb-1 text-xs tracking-wider text-[var(--gold-soft)] uppercase">
									Campaign Goal
								</p>
								<h3 class="text-base font-bold text-[var(--txt)]">
									{message.campaignGoal}
								</h3>
							</div>
						{/if}

						{#if message.message}
							<div class="mb-5">
								<p class="line-clamp-5 text-sm leading-relaxed text-[var(--muted)]">
									{message.message}
								</p>
							</div>
						{/if}

						{#if message.notes}
							<div class="mb-5 rounded-2xl border border-[var(--stroke-soft)] bg-black/30 p-4">
								<p class="mb-1 text-xs tracking-wider text-[var(--orange)] uppercase">Notes</p>
								<p class="text-sm leading-relaxed text-[var(--muted)]">
									{message.notes}
								</p>
							</div>
						{/if}

						<div
							class="flex items-center justify-between gap-4 border-t border-[var(--stroke-soft)] pt-4"
						>
							<div class="min-w-0">
								<p class="truncate text-xs text-[var(--muted-2)]">
									{message.source ?? 'website'} · {message.status ?? 'new'}
								</p>

								{#if message.launchDate}
									<p class="mt-1 truncate text-xs text-[var(--muted-2)]">
										Launch: {message.launchDate}
									</p>
								{/if}
							</div>

							<p class="shrink-0 text-xs text-[var(--muted-2)]">
								{new Date(message?.createdAt).toLocaleString()}
							</p>
						</div>
					</div>

					<div class="flex flex-row gap-4 border-t border-[var(--stroke-soft)] bg-black/20 p-4">
						<div></div>
						<Read data={readForm} id={message.id} />
						<Delete action="?/delete" data={deleteForm} id={message.id} />
					</div>
				</div>
			{/each}
		</div>

		{#if messages.length === 0}
			<div
				class="mt-20 flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-[var(--stroke)] bg-[var(--glass)] py-20 text-center shadow-2xl backdrop-blur-xl"
			>
				<div
					class="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-[image:var(--brand-grad)] text-4xl shadow-2xl"
				>
					📭
				</div>

				<h3 class="text-2xl font-black text-[var(--txt)]">No Messages Yet</h3>

				<p class="mt-2 text-sm text-[var(--muted)]">New contact inquiries will appear here.</p>
			</div>
		{/if}
	</div>
</div>
