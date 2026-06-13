<script lang="ts">
	type ContactMessage = {
		id: string;
		createdAt?: Date | number | string | null;

		fullName: string;
		email?: string | null;
		phone?: string | null;
		company?: string | null;
		country?: string | null;

		applicantType?: string | null;
		packageSelected?: string | null;
		topicsInterested?: string[] | string | null;
		mainGoal?: string | null;
		experienceLevel?: string | null;
		packageIncludes?: string[] | string | null;
		participantCount?: string | null;
		preferredTrainingMode?: string | null;
		budgetRange?: string | null;
		preferredStartDate?: Date | number | string | null;
		recommendedPackage?: string | null;

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

	const asList = (value: string[] | string | null | undefined) => {
		if (!value) return [];

		if (Array.isArray(value)) {
			return value.filter(Boolean);
		}

		try {
			const parsed = JSON.parse(value);

			if (Array.isArray(parsed)) {
				return parsed.filter(Boolean);
			}
		} catch {
			// Keep going and return the plain string below.
		}

		return [value];
	};

	const formatDate = (value: Date | number | string | null | undefined) => {
		if (!value) return 'Not provided';

		const date = new Date(value);

		if (Number.isNaN(date.getTime())) {
			return String(value);
		}

		return date.toLocaleString();
	};

	const getInitial = (name: string) => {
		return name?.trim()?.charAt(0)?.toUpperCase() || '?';
	};

	const getLeadTypeLabel = (message: ContactMessage) => {
		if (message.applicantType) return message.applicantType;
		if (message.company) return 'Organization';
		return 'Individual';
	};

	const unreadCount = () => messages.filter((message) => !message.seen).length;

	const organizationCount = () =>
		messages.filter((message) =>
			[
				'Business',
				'Government Organization',
				'NGO or Nonprofit',
				'School or University',
				'Training Institution',
				'Startup'
			].includes(message.applicantType ?? '')
		).length;

	let searchTerm = $state('');
	let sortBy = $state('newest');
	let visibilityFilter = $state('all');

	const searchableText = (message: ContactMessage) => {
		return [
			message.fullName,
			message.email,
			message.phone,
			message.company,
			message.country,
			message.applicantType,
			message.packageSelected,
			message.mainGoal,
			message.experienceLevel,
			message.participantCount,
			message.preferredTrainingMode,
			message.budgetRange,
			message.recommendedPackage,
			message.message,
			message.source,
			message.status,
			message.notes,
			...asList(message.topicsInterested),
			...asList(message.packageIncludes)
		]
			.filter(Boolean)
			.join(' ')
			.toLowerCase();
	};

	const getTime = (value: Date | number | string | null | undefined) => {
		if (!value) return 0;

		const date = new Date(value);

		if (Number.isNaN(date.getTime())) return 0;

		return date.getTime();
	};

	const filteredMessages = $derived.by(() => {
		const query = searchTerm.trim().toLowerCase();

		return messages
			.filter((message) => {
				if (visibilityFilter === 'new' && message.seen) return false;
				if (visibilityFilter === 'reviewed' && !message.seen) return false;

				if (!query) return true;

				return searchableText(message).includes(query);
			})
			.sort((a, b) => {
				if (sortBy === 'newest') {
					return getTime(b.createdAt) - getTime(a.createdAt);
				}

				if (sortBy === 'oldest') {
					return getTime(a.createdAt) - getTime(b.createdAt);
				}

				if (sortBy === 'new-leads') {
					return Number(a.seen) - Number(b.seen);
				}

				if (sortBy === 'name') {
					return a.fullName.localeCompare(b.fullName);
				}

				if (sortBy === 'company') {
					return (a.company ?? '').localeCompare(b.company ?? '');
				}

				if (sortBy === 'package') {
					return (a.packageSelected ?? '').localeCompare(b.packageSelected ?? '');
				}

				if (sortBy === 'start-date') {
					return getTime(a.preferredStartDate) - getTime(b.preferredStartDate);
				}

				return 0;
			});
	});

	const clearSearch = () => {
		searchTerm = '';
		visibilityFilter = 'all';
		sortBy = 'newest';
	};
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

				<h1 class="text-4xl font-black tracking-tight text-[var(--txt)]">AI Leads</h1>

				<p class="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
					Review consultation requests, training inquiries, automation needs, and AI transformation
					opportunities submitted through the Abyssiniya AI website.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
				<div
					class="rounded-3xl border border-[var(--stroke)] bg-[var(--glass)] px-5 py-4 shadow-2xl backdrop-blur-xl"
				>
					<p class="text-xs font-semibold tracking-widest text-[var(--muted-2)] uppercase">Total</p>
					<p class="mt-1 text-3xl font-black text-[var(--amber)]">{messages.length}</p>
				</div>

				<div
					class="rounded-3xl border border-[var(--stroke)] bg-[var(--glass)] px-5 py-4 shadow-2xl backdrop-blur-xl"
				>
					<p class="text-xs font-semibold tracking-widest text-[var(--muted-2)] uppercase">New</p>
					<p class="mt-1 text-3xl font-black text-[var(--orange)]">{unreadCount()}</p>
				</div>

				<div
					class="rounded-3xl border border-[var(--stroke)] bg-[var(--glass)] px-5 py-4 shadow-2xl backdrop-blur-xl"
				>
					<p class="text-xs font-semibold tracking-widest text-[var(--muted-2)] uppercase">
						Organizations
					</p>
					<p class="mt-1 text-3xl font-black text-[var(--green)]">{organizationCount()}</p>
				</div>
			</div>
		</div>

		<div
			class="mb-8 rounded-[2rem] border border-[var(--stroke)] bg-[var(--glass)] p-5 shadow-2xl backdrop-blur-xl"
		>
			<div class="grid gap-4 lg:grid-cols-[1fr_auto_auto_auto] lg:items-end">
				<div class="flex flex-col gap-2">
					<label
						for="lead-search"
						class="text-xs font-semibold tracking-widest text-[var(--muted-2)] uppercase"
					>
						Search Leads
					</label>

					<input
						id="lead-search"
						type="search"
						bind:value={searchTerm}
						placeholder="Search name, company, service, goal, topic, phone, email..."
						class="w-full rounded-2xl border border-[var(--stroke-soft)] bg-black/20 px-4 py-3 text-sm text-[var(--txt)] placeholder:text-[var(--muted-2)] outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
					/>
				</div>

				<div class="flex flex-col gap-2">
					<label
						for="visibility-filter"
						class="text-xs font-semibold tracking-widest text-[var(--muted-2)] uppercase"
					>
						Filter
					</label>

					<select
						id="visibility-filter"
						bind:value={visibilityFilter}
						class="rounded-2xl border border-[var(--stroke-soft)] bg-black/20 px-4 py-3 text-sm text-[var(--txt)] outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
					>
						<option class="text-black" value="all">All leads</option>
						<option class="text-black" value="new">New only</option>
						<option class="text-black" value="reviewed">Reviewed only</option>
					</select>
				</div>

				<div class="flex flex-col gap-2">
					<label
						for="sort-by"
						class="text-xs font-semibold tracking-widest text-[var(--muted-2)] uppercase"
					>
						Sort By
					</label>

					<select
						id="sort-by"
						bind:value={sortBy}
						class="rounded-2xl border border-[var(--stroke-soft)] bg-black/20 px-4 py-3 text-sm text-[var(--txt)] outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
					>
						<option class="text-black" value="newest">Newest first</option>
						<option class="text-black" value="oldest">Oldest first</option>
						<option class="text-black" value="new-leads">New leads first</option>
						<option class="text-black" value="name">Name A–Z</option>
						<option class="text-black" value="company">Company A–Z</option>
						<option class="text-black" value="package">Package / service A–Z</option>
						<option class="text-black" value="start-date">Preferred start date</option>
					</select>
				</div>

				<button
					type="button"
					onclick={clearSearch}
					class="rounded-2xl border border-[var(--stroke-soft)] bg-white/[.05] px-5 py-3 text-sm font-bold text-[var(--txt)] transition hover:bg-white/[.1]"
				>
					Reset
				</button>
			</div>

			<div
				class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--stroke-soft)] pt-4"
			>
				<p class="text-sm text-[var(--muted)]">
					Showing
					<span class="font-bold text-[var(--amber)]">{filteredMessages.length}</span>
					of
					<span class="font-bold text-[var(--txt)]">{messages.length}</span>
					AI leads
				</p>

				{#if searchTerm || visibilityFilter !== 'all'}
					<p
						class="rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 text-xs text-[var(--amber)]"
					>
						Filtered view active
					</p>
				{/if}
			</div>
		</div>
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
			{#each filteredMessages as message (message.id)}
				{@const topics = asList(message.topicsInterested)}
				{@const includes = asList(message.packageIncludes)}

				<article
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
								{getInitial(message.fullName)}
							</div>

							<div class="min-w-0 flex-1">
								<div class="flex flex-wrap items-center gap-2">
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
										{message.seen ? 'Reviewed' : 'New Lead'}
									</span>
								</div>

								<p class="mt-1 truncate text-sm text-[var(--muted)]">
									{getLeadTypeLabel(message)}
								</p>

								{#if message.email}
									<p class="mt-1 truncate text-sm text-[var(--muted)]">{message.email}</p>
								{/if}

								{#if message.phone}
									<p class="mt-1 text-xs text-[var(--muted-2)]">{message.phone}</p>
								{/if}
							</div>
						</div>

						{#if message.mainGoal}
							<div class="mb-5 rounded-2xl border border-[var(--gold)]/20 bg-[var(--gold)]/10 p-4">
								<p class="mb-1 text-xs tracking-wider text-[var(--gold-soft)] uppercase">
									Primary AI Goal
								</p>
								<h3 class="text-base font-bold leading-6 text-[var(--txt)]">
									{message.mainGoal}
								</h3>
							</div>
						{/if}

						<div class="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
							{#if message.company}
								<div class="rounded-2xl border border-[var(--stroke-soft)] bg-black/20 p-3">
									<p class="text-xs tracking-wider text-[var(--muted-2)] uppercase">Organization</p>
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
									<p class="text-xs tracking-wider text-[var(--muted-2)] uppercase">
										Interested In
									</p>
									<p class="text-sm font-semibold text-[var(--txt)]">{message.packageSelected}</p>
								</div>
							{/if}

							{#if message.recommendedPackage}
								<div class="rounded-2xl border border-[var(--gold)]/25 bg-[var(--gold)]/10 p-3">
									<p class="text-xs tracking-wider text-[var(--gold-soft)] uppercase">
										Recommended
									</p>
									<p class="text-sm font-semibold text-[var(--amber)]">
										{message.recommendedPackage}
									</p>
								</div>
							{/if}

							{#if message.experienceLevel}
								<div
									class="rounded-2xl border border-[var(--stroke-soft)] bg-black/20 p-3 sm:col-span-2"
								>
									<p class="text-xs tracking-wider text-[var(--muted-2)] uppercase">
										AI Experience
									</p>
									<p class="text-sm font-semibold leading-6 text-[var(--txt)]">
										{message.experienceLevel}
									</p>
								</div>
							{/if}

							{#if message.participantCount}
								<div class="rounded-2xl border border-[var(--stroke-soft)] bg-black/20 p-3">
									<p class="text-xs tracking-wider text-[var(--muted-2)] uppercase">Participants</p>
									<p class="text-sm font-semibold text-[var(--txt)]">
										{message.participantCount}
									</p>
								</div>
							{/if}

							{#if message.preferredTrainingMode}
								<div class="rounded-2xl border border-[var(--stroke-soft)] bg-black/20 p-3">
									<p class="text-xs tracking-wider text-[var(--muted-2)] uppercase">
										Delivery Mode
									</p>
									<p class="text-sm font-semibold text-[var(--txt)]">
										{message.preferredTrainingMode}
									</p>
								</div>
							{/if}

							{#if message.budgetRange}
								<div class="rounded-2xl border border-[var(--stroke-soft)] bg-black/20 p-3">
									<p class="text-xs tracking-wider text-[var(--muted-2)] uppercase">Budget</p>
									<p class="text-sm font-semibold text-[var(--amber)]">{message.budgetRange}</p>
								</div>
							{/if}

							{#if message.preferredStartDate}
								<div class="rounded-2xl border border-[var(--stroke-soft)] bg-black/20 p-3">
									<p class="text-xs tracking-wider text-[var(--muted-2)] uppercase">
										Preferred Start
									</p>
									<p class="text-sm font-semibold text-[var(--txt)]">
										{formatDate(message.preferredStartDate)}
									</p>
								</div>
							{/if}
						</div>

						{#if topics.length > 0}
							<div class="mb-5 rounded-2xl border border-[var(--stroke-soft)] bg-black/20 p-4">
								<p class="mb-3 text-xs tracking-wider text-[var(--muted-2)] uppercase">AI Topics</p>

								<div class="flex flex-wrap gap-2">
									{#each topics.slice(0, 6) as topic}
										<span
											class="rounded-full border border-[var(--stroke-soft)] bg-white/[.05] px-3 py-1 text-xs text-[var(--muted)]"
										>
											{topic}
										</span>
									{/each}
								</div>

								{#if topics.length > 6}
									<details class="group mt-3">
										<summary
											class="inline-flex cursor-pointer list-none rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 text-xs font-semibold text-[var(--amber)] transition hover:bg-[var(--gold)]/20"
										>
											<span class="group-open:hidden">+{topics.length - 6} more topics</span>
											<span class="hidden group-open:inline">Show fewer topics</span>
										</summary>

										<div class="mt-3 flex flex-wrap gap-2">
											{#each topics.slice(6) as topic}
												<span
													class="rounded-full border border-[var(--stroke-soft)] bg-white/[.05] px-3 py-1 text-xs text-[var(--muted)]"
												>
													{topic}
												</span>
											{/each}
										</div>
									</details>
								{/if}
							</div>
						{/if}

						{#if includes.length > 0}
							<div class="mb-5 rounded-2xl border border-[var(--stroke-soft)] bg-black/20 p-4">
								<p class="mb-3 text-xs tracking-wider text-[var(--muted-2)] uppercase">
									Requested Package Includes
								</p>

								<div class="space-y-2">
									{#each includes.slice(0, 5) as item}
										<div class="flex gap-2 text-sm text-[var(--muted)]">
											<span class="text-[var(--green)]">✓</span>
											<span>{item}</span>
										</div>
									{/each}
								</div>

								{#if includes.length > 5}
									<details class="group mt-3">
										<summary
											class="inline-flex cursor-pointer list-none rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 text-xs font-semibold text-[var(--amber)] transition hover:bg-[var(--gold)]/20"
										>
											<span class="group-open:hidden"
												>+{includes.length - 5} more requested items</span
											>
											<span class="hidden group-open:inline">Show fewer requested items</span>
										</summary>

										<div class="mt-3 space-y-2">
											{#each includes.slice(5) as item}
												<div class="flex gap-2 text-sm text-[var(--muted)]">
													<span class="text-[var(--green)]">✓</span>
													<span>{item}</span>
												</div>
											{/each}
										</div>
									</details>
								{/if}
							</div>
						{/if}

						{#if message.message}
							<div class="mb-5 rounded-2xl border border-[var(--stroke-soft)] bg-black/20 p-4">
								<p class="mb-2 text-xs tracking-wider text-[var(--muted-2)] uppercase">
									Lead Message
								</p>
								<p class="line-clamp-5 text-sm leading-relaxed text-[var(--muted)]">
									{message.message}
								</p>
							</div>
						{/if}

						{#if message.notes}
							<div
								class="mb-5 rounded-2xl border border-[var(--orange)]/20 bg-[var(--orange)]/10 p-4"
							>
								<p class="mb-1 text-xs tracking-wider text-[var(--orange)] uppercase">
									Internal Notes
								</p>
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
									Source: {message.source ?? 'website'} · Status: {message.status ?? 'new'}
								</p>
							</div>

							<p class="shrink-0 text-xs text-[var(--muted-2)]">
								{formatDate(message.createdAt)}
							</p>
						</div>
					</div>

					<div
						class="flex flex-row items-center justify-end gap-4 border-t border-[var(--stroke-soft)] bg-black/20 p-4"
					>
						<Read data={readForm} id={message.id} />
						<Delete action="?/delete" data={deleteForm} id={message.id} />
					</div>
				</article>
			{/each}
		</div>

		{#if filteredMessages.length === 0}
			<div
				class="mt-20 flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-[var(--stroke)] bg-[var(--glass)] px-6 py-20 text-center shadow-2xl backdrop-blur-xl"
			>
				<div
					class="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-[image:var(--brand-grad)] text-4xl shadow-2xl"
				>
					{messages.length === 0 ? '🤖' : '🔎'}
				</div>

				<h3 class="text-2xl font-black text-[var(--txt)]">
					{messages.length === 0 ? 'No AI Leads Yet' : 'No Matching Leads'}
				</h3>

				<p class="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
					{#if messages.length === 0}
						New AI training, automation, chatbot, voice agent, and business transformation inquiries
						will appear here.
					{:else}
						No leads match your current search or filter. Try changing the keyword, filter, or sort
						option.
					{/if}
				</p>

				{#if messages.length > 0}
					<button
						type="button"
						onclick={clearSearch}
						class="mt-6 rounded-full border border-[var(--stroke)] bg-white/[.05] px-5 py-3 text-sm font-bold text-[var(--txt)] transition hover:bg-white/[.1]"
					>
						Clear filters
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>
