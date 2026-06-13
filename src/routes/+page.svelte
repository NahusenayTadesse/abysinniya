<script lang="ts">
	let { data } = $props();

	import { SendIcon, Loader } from '@lucide/svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import Home from './home.svelte';

	const { form, errors, enhance, delayed, message } = superForm(data.form, {
		dataType: 'json'
	});

	const applicantTypes = [
		'Individual',
		'Business',
		'Government Organization',
		'NGO or Nonprofit',
		'School or University',
		'Training Institution',
		'Startup',
		'Freelancer',
		'Other'
	];

	const packages = [
		'AI Agents',
		'Smart Chatbots',
		'AI-Powered Websites',
		'Mobile Apps with AI',
		'Business Automation',
		'AI-Powered ERP',
		'Corporate AI Training',
		'Individual AI Courses',
		'Custom AI Solutions',
		'AI Essentials',
		'Professional AI Certification',
		'Business AI Transformation'
	];

	const aiTopics = [
		'Introduction to Artificial Intelligence',
		'Generative AI',
		'Prompt Engineering',
		'ChatGPT and AI Productivity Tools',
		'AI for Document Writing',
		'AI for Research and Summarization',
		'AI for Presentations',
		'AI for Data Analysis',
		'AI for Marketing and Content Creation',
		'AI for Customer Service',
		'AI Chatbots',
		'AI Voice Agents',
		'Sales Automation',
		'Workflow Automation',
		'No-Code AI Tools',
		'AI Agents',
		'AI for Software Development',
		'Building AI-Powered Applications',
		'Responsible and Ethical AI',
		'AI Governance and Organizational Policy',
		'AI Strategy for Businesses'
	];

	const goals = [
		'Understand the basics of AI',
		'Improve my career opportunities',
		'Earn an AI certificate',
		'Start a career in AI',
		'Build AI applications',
		'Automate repetitive tasks',
		'Improve customer support',
		'Generate more sales',
		'Train my employees'
	];

	const experienceLevels = [
		'I have never used AI tools',
		'I have used ChatGPT or similar tools occasionally',
		'I regularly use AI tools for work',
		'I understand prompt engineering',
		'I have worked with automation tools',
		'I have built chatbots or AI applications',
		'I am an experienced technical professional'
	];

	const packageIncludes = [
		'Online instructor-led training',
		'Onsite business training',
		'Practical exercises',
		'Training materials',
		'Prompt templates',
		'AI tool recommendations',
		'Practical project',
		'Certificate of completion',
		'AI adoption roadmap',
		'Custom chatbot',
		'AI voice agent',
		'Business automation setup'
	];

	const participantCounts = [
		'Only me',
		'2–5 participants',
		'6–10 participants',
		'11–25 participants',
		'26–50 participants',
		'More than 50 participants'
	];

	const trainingModes = [
		'Online training',
		'Onsite training',
		'Hybrid training',
		'Consultation first',
		'Not sure yet'
	];
</script>

<svelte:head>
	<title>Abyssiniya AI — Intelligent AI Solutions for Africa</title>

	<meta
		name="description"
		content="Abyssiniya AI builds intelligent AI-powered solutions, automation tools, and digital systems designed for businesses, organizations, and innovators across Africa."
	/>

	<meta
		name="keywords"
		content="Abyssiniya AI, AI Ethiopia, Artificial Intelligence Africa, Machine Learning, Automation, Business Intelligence, AI Solutions, Ethiopian Technology, Digital Transformation"
	/>

	<meta name="author" content="Abyssiniya AI" />
	<meta name="robots" content="index, follow" />

	<link rel="canonical" href="https://abyssiniya.ai" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://abyssiniya.ai" />
	<meta property="og:site_name" content="Abyssiniya AI" />
	<meta property="og:title" content="Abyssiniya AI — Intelligent AI Solutions for Africa" />
	<meta
		property="og:description"
		content="Building intelligent AI-powered solutions, automation systems, and digital experiences for the next generation of African innovation."
	/>
	<meta property="og:image" content="/logo.png" />
	<meta property="og:image:alt" content="Abyssiniya AI Logo" />

	<!-- Twitter / X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://abyssiniya.ai" />
	<meta name="twitter:title" content="Abyssiniya AI — Intelligent AI Solutions for Africa" />
	<meta
		name="twitter:description"
		content="Building intelligent AI-powered solutions, automation systems, and digital experiences for the next generation of African innovation."
	/>
	<meta name="twitter:image" content="/logo.png" />

	<!-- Theme -->
	<meta name="theme-color" content="#070b07" />

	<!-- Favicon -->
	<link rel="icon" href="/logo.png" />
	<link rel="apple-touch-icon" href="/logo.png" />
</svelte:head>

{#snippet fe(
	label = '',
	name = '',
	type = '',
	placeholder = '',
	required = false,
	min = '',
	max = ''
)}
	<div class="flex w-full flex-col gap-2">
		<label for={name} class="text-sm font-medium tracking-wide text-[var(--txt)]">
			{label}
		</label>

		{#if type === 'textarea'}
			<textarea
				id={name}
				{name}
				{placeholder}
				{required}
				bind:value={$form[name]}
				class="min-h-[150px] w-full resize-none rounded-xl border border-[var(--stroke)] bg-[var(--glass)] px-4 py-3 text-[var(--txt)] placeholder:text-[var(--muted-2)] backdrop-blur-xl transition-all duration-300 focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 focus:outline-none"
				aria-invalid={$errors[name] ? 'true' : undefined}
			></textarea>
		{:else}
			<input
				id={name}
				{type}
				{name}
				{placeholder}
				{required}
				{min}
				{max}
				bind:value={$form[name]}
				class="w-full rounded-xl border border-[var(--stroke)] bg-[var(--glass)] px-4 py-3 text-[var(--txt)] placeholder:text-[var(--muted-2)] backdrop-blur-xl transition-all duration-300 focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 focus:outline-none"
				aria-invalid={$errors[name] ? 'true' : undefined}
			/>
		{/if}

		{#if $errors[name]}
			<span class="text-sm text-[var(--red)]">{$errors[name]}</span>
		{/if}
	</div>
{/snippet}

{#snippet selection(
	label = '',
	name = '',
	placeholder = 'Select an option',
	required = false,
	items = []
)}
	<div class="flex w-full flex-col gap-2">
		<label for={name} class="text-sm font-medium tracking-wide text-[var(--txt)]">
			{label}
		</label>

		<select
			id={name}
			{name}
			{required}
			bind:value={$form[name]}
			class="w-full rounded-xl border border-[var(--stroke)] bg-[var(--glass)] px-4 py-3 text-[var(--txt)] backdrop-blur-xl transition-all duration-300 focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 focus:outline-none"
			aria-invalid={$errors[name] ? 'true' : undefined}
		>
			<option class="text-black" value="">{placeholder}</option>

			{#each items as item}
				<option class="text-black" value={item}>{item}</option>
			{/each}
		</select>

		{#if $errors[name]}
			<span class="text-sm text-[var(--red)]">{$errors[name]}</span>
		{/if}
	</div>
{/snippet}

{#snippet multiSelection(label = '', name = '', items = [])}
	<div class="flex w-full flex-col gap-3">
		<label class="text-sm font-medium tracking-wide text-[var(--txt)]">
			{label}
		</label>

		<div
			class="grid gap-3 rounded-xl border border-[var(--stroke)] bg-[var(--glass)] p-4 backdrop-blur-xl sm:grid-cols-2"
		>
			{#each items as item}
				<label class="flex items-start gap-3 text-sm leading-6 text-[var(--muted)]">
					<input
						type="checkbox"
						name={`${name}[]`}
						value={item}
						bind:group={$form[name]}
						class="mt-1 accent-[var(--gold)]"
					/>
					<span>{item}</span>
				</label>
			{/each}
		</div>

		{#if $errors[name]}
			<span class="text-sm text-[var(--red)]">{$errors[name]}</span>
		{/if}
	</div>
{/snippet}

<Home>
	<section class="relative w-full overflow-hidden">
		<div class="absolute inset-0 hero-gradient"></div>
		<div class="absolute inset-0 bg-black/30"></div>

		<div class="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-36">
			<div class="text-center">
				<p class="mb-4 text-sm font-semibold tracking-[0.25em] text-[var(--gold)] uppercase">
					Get Started
				</p>

				<h1 class="mx-auto max-w-4xl text-5xl font-bold text-[var(--txt)] lg:text-7xl">
					Let's Build Something Exceptional
				</h1>

				<p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
					Tell us about your project, goals, and vision. We'll reach out with the best solution for
					your business.
				</p>
			</div>
		</div>
	</section>

	<div id="contact" class="min-h-dvh w-full bg-[var(--ink)] text-[var(--txt)]">
		<main class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-5xl">
				<div class="glass-card p-6 sm:p-8 lg:p-12">
					<div class="mb-8">
						<p class="mb-3 text-sm font-semibold tracking-[0.2em] text-[var(--gold)] uppercase">
							Contact Us
						</p>

						<h2 class="text-3xl font-bold text-[var(--txt)] sm:text-4xl">Start Your Project</h2>

						{#if $message}
							<div
								class:success={$message.type === 'success'}
								class:error={$message.type === 'error'}
								class="message"
							>
								{$message.text}
							</div>
						{/if}

						<p class="mt-3 text-center text-[var(--muted)]">
							Fill out the details below and our team will get back to you shortly.
						</p>
					</div>

					<form class="space-y-6" action="?/contact" method="POST" use:enhance>
						{#if $message}
							<div
								class:success={$message.type === 'success'}
								class:error={$message.type === 'error'}
								class="message"
							>
								{$message.text}
							</div>
						{/if}

						<div class="grid gap-6 md:grid-cols-2">
							{@render fe('Full Name', 'fullName', 'text', 'Enter your full name', true)}
							{@render fe('Email Address', 'email', 'email', 'your@email.com')}
							{@render fe('Phone Number', 'phone', 'tel', '+251 901020304')}
							{@render fe(
								'Company / Organization',
								'company',
								'text',
								'Company or organization name'
							)}
							{@render fe('Country', 'country', 'text', 'Ethiopia')}

							{@render selection(
								'Who are you?',
								'applicantType',
								'Select applicant type',
								false,
								applicantTypes
							)}

							{@render selection(
								'Package or Service Interested In',
								'packageSelected',
								'Select a package or service',
								false,
								packages
							)}

							{@render selection('Main Goal', 'mainGoal', 'Select your main goal', false, goals)}

							{@render selection(
								'Current AI Experience',
								'experienceLevel',
								'Select your experience level',
								false,
								experienceLevels
							)}

							{@render selection(
								'How many people will participate?',
								'participantCount',
								'Select participant count',
								false,
								participantCounts
							)}

							{@render selection(
								'Preferred Training / Delivery Mode',
								'preferredTrainingMode',
								'Select delivery mode',
								false,
								trainingModes
							)}

							{@render fe(
								'Budget Range',
								'budgetRange',
								'text',
								'Example: ETB 50,000 - ETB 150,000'
							)}
							{@render fe('Preferred Start Date', 'preferredStartDate', 'date')}
						</div>

						{@render multiSelection(
							'AI Topics You Are Interested In',
							'topicsInterested',
							aiTopics
						)}

						{@render multiSelection('What Should Be Included?', 'packageIncludes', packageIncludes)}

						{@render fe(
							'Message',
							'message',
							'textarea',
							'Tell us more about your goals, business challenge, team, or project...'
						)}

						<button
							type="submit"
							class="group flex w-full items-center justify-center gap-3 rounded-xl px-8 py-4 font-semibold text-[var(--txt)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
							style="background: var(--brand-grad)"
						>
							{#if $delayed}
								<Loader class="h-5 w-5 animate-spin" />
								Sending...
							{:else}
								<SendIcon class="h-5 w-5 transition-transform group-hover:translate-x-1" />
								Send Inquiry
							{/if}
						</button>
					</form>
				</div>
			</div>
		</main>
	</div>
</Home>

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

	.hero-gradient {
		background:
			radial-gradient(circle at top left, rgba(240, 138, 29, 0.28), transparent 42%),
			radial-gradient(circle at bottom right, rgba(58, 138, 18, 0.28), transparent 42%),
			linear-gradient(135deg, rgba(196, 42, 12, 0.22), rgba(7, 11, 7, 0.95)), var(--ink);
	}

	.glass-card {
		background: var(--glass);
		backdrop-filter: blur(20px);
		border: 1px solid var(--stroke);
		border-radius: 24px;
		box-shadow:
			0 20px 50px rgba(0, 0, 0, 0.35),
			inset 0 1px 0 rgba(255, 255, 255, 0.04);
	}

	.message {
		padding: 12px 16px;
		border-radius: 12px;
		font-size: 14px;
		font-weight: 500;
		border: 1px solid transparent;
	}

	.success {
		background: rgba(58, 138, 18, 0.12);
		color: #7fd45b;
		border-color: rgba(58, 138, 18, 0.4);
	}

	.error {
		background: rgba(196, 42, 12, 0.12);
		color: #ff8a73;
		border-color: rgba(196, 42, 12, 0.4);
	}
</style>
