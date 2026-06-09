<script>
	import {
		Brain,
		Bot,
		Workflow,
		CheckCircle2,
		GraduationCap,
		Building2,
		Sparkles,
		Quote,
		HelpCircle
	} from '@lucide/svelte';

	let { children } = $props();

	const features = [
		{
			title: 'AI Education',
			text: 'Foundational AI, machine learning, prompt engineering, and responsible AI training.',
			icon: Brain
		},
		{
			title: 'Applied AI Systems',
			text: 'Hands-on exposure to chatbots, automation tools, predictive models, and business AI workflows.',
			icon: Bot
		},
		{
			title: 'Digital Problem Solving',
			text: 'Learn how AI can analyze data, automate repetitive tasks, and solve real business challenges.',
			icon: Workflow
		}
	];

	const packages = [
		{
			name: 'AI Foundation Program',
			price: 'For beginners',
			icon: GraduationCap,
			items: ['AI concepts', 'Prompt engineering', 'Machine learning basics', 'Practical exercises']
		},
		{
			name: 'Professional AI Certification',
			price: 'Career focused',
			icon: Sparkles,
			items: [
				'Applied AI tools',
				'Portfolio projects',
				'Business automation',
				'Certificate of completion'
			],
			highlight: true
		},
		{
			name: 'Business AI Transformation',
			price: 'For companies',
			icon: Building2,
			items: ['AI workflow audit', 'Team training', 'Automation strategy', 'Custom AI systems']
		}
	];

	const testimonials = [
		{
			name: 'Student Graduate',
			role: 'AI Certification Learner',
			text: 'The training made AI easy to understand and immediately useful for my career.'
		},
		{
			name: 'Business Owner',
			role: 'Automation Client',
			text: 'Abyssiniya AI helped us see how automation can save time and improve daily operations.'
		},
		{
			name: 'Professional Trainee',
			role: 'Prompt Engineering Program',
			text: 'The program was practical, structured, and focused on real tools we can use.'
		}
	];

	const faqs = [
		{
			q: 'Who can join the AI programs?',
			a: 'Students, professionals, entrepreneurs, and business teams who want practical AI skills.'
		},
		{
			q: 'Do I need coding experience?',
			a: 'No. Beginner programs start from the basics and gradually introduce applied AI tools.'
		},
		{
			q: 'Are certificates provided?',
			a: 'Yes. Certification-focused programs include completion certificates after training requirements are met.'
		},
		{
			q: 'Do you train companies?',
			a: 'Yes. Abyssiniya AI offers business-focused AI training, workflow analysis, and automation guidance.'
		}
	];

	const stats = [
		['15k+', 'Students'],
		['75%', 'Total Success'],
		['35', 'Main Questions'],
		['26', 'Chief Experts'],
		['16', 'Years Experience']
	];
</script>

<svelte:head>
	<title>Abyssiniya AI PLC | AI Education & Certification</title>
	<meta
		name="description"
		content="Professional AI certification, applied AI systems, and business automation training by Abyssiniya AI PLC."
	/>
</svelte:head>

<div class="fixed inset-0 -z-10 overflow-hidden bg-[var(--ink)]">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(196,42,12,.42),transparent_32%),radial-gradient(circle_at_85%_15%,rgba(58,138,18,.35),transparent_34%),radial-gradient(circle_at_50%_105%,rgba(240,138,29,.42),transparent_42%)]"
	></div>

	<div
		class="absolute inset-0 bg-[linear-gradient(135deg,rgba(196,42,12,.18),transparent_35%,rgba(58,138,18,.16)),linear-gradient(225deg,transparent_30%,rgba(235,164,23,.16),transparent_70%)]"
	></div>

	<div
		class="absolute bottom-[-18rem] left-1/2 h-[38rem] w-[90rem] -translate-x-1/2 rounded-full bg-[var(--brand-grad)] opacity-35 blur-[120px]"
	></div>

	<div
		class="absolute left-[-12rem] top-[35%] h-[28rem] w-[28rem] rounded-full bg-[var(--red)] opacity-20 blur-[110px]"
	></div>
	<div
		class="absolute right-[-10rem] top-[45%] h-[32rem] w-[32rem] rounded-full bg-[var(--green)] opacity-20 blur-[120px]"
	></div>

	<div
		class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25"
	></div>

	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,11,7,.18)_45%,rgba(7,11,7,.88)_100%)]"
	></div>
</div>

<div
	class="min-h-screen text-white
[background:
radial-gradient(circle_at_15%_20%,rgba(196,42,12,0.22)_0%,transparent_15%),
radial-gradient(circle_at_85%_25%,rgba(240,138,29,0.18)_0%,transparent_10%),
radial-gradient(circle_at_50%_80%,rgba(58,138,18,0.16)_0%,transparent_15%),
linear-gradient(135deg,#070b07_0%,#0b1209_35%,#10160d_65%,#070b07_100%)]"
>
	<div class="fixed inset-0 -z-10">
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(196,42,12,.3),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(58,138,18,.25),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(240,138,29,.22),transparent_40%)]"
		></div>
		<div
			class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"
		></div>
	</div>

	<!-- Header -->
	<header
		class="fixed w-full top-0 z-50 border-b border-[var(--stroke-soft)] bg-[rgba(7,11,7,.7)] backdrop-blur-2xl"
	>
		<nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
			<a href="/" class="flex items-center gap-3">
				<div>
					<img
						src="/logo.png"
						alt="Abyssiniya AI"
						class="h-16 shadow-lg shadow-orange-900/30 rounded-lg"
					/>
				</div>
			</a>

			<div class="hidden items-center gap-8 text-sm text-[var(--muted)] md:flex">
				<a href="#programs" class="hover:text-white">Programs</a>
				<a href="#packages" class="hover:text-white">Packages</a>
				<a href="#impact" class="hover:text-white">Impact</a>
				<a
					href="#contact"
					class="rounded-full bg-white px-5 py-2 font-semibold text-black hover:bg-[var(--amber)]"
				>
					Contact Us
				</a>
			</div>
		</nav>
	</header>

	<!-- Hero -->
	<section
		class="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:pt-28"
	>
		<div>
			<div
				class="mb-6 inline-flex rounded-full border border-[var(--stroke)] bg-[var(--glass)] px-4 py-2 text-sm text-[var(--muted)] backdrop-blur-xl"
			>
				Empowering Careers Through Professional Certification
			</div>

			<h1 class="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
				Build practical AI skills for the future of work.
			</h1>

			<p class="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)]">
				Abyssiniya AI PLC is an Ethiopian AI-focused education and applied technology company making
				Artificial Intelligence practical, accessible, and economically impactful for individuals
				and businesses.
			</p>

			<div class="mt-9 flex flex-wrap gap-4">
				<a
					href="#contact"
					class="rounded-full bg-[var(--brand-grad)] px-7 py-4 font-bold text-white shadow-xl shadow-orange-950/30"
				>
					Start Your AI Journey
				</a>
				<a
					href="#packages"
					class="rounded-full border border-[var(--stroke)] bg-[var(--glass)] px-7 py-4 font-bold backdrop-blur-xl hover:bg-white/10"
				>
					View Packages
				</a>
			</div>
		</div>

		<div class="relative">
			<div
				class="absolute -inset-4 rounded-[2.5rem] bg-[var(--brand-grad)] opacity-30 blur-2xl"
			></div>
			<div
				class="relative rounded-[2rem] border border-[var(--stroke)] bg-[var(--glass)] p-6 shadow-2xl backdrop-blur-2xl"
			>
				<div class="rounded-[1.5rem] border border-[var(--stroke-soft)] bg-black/25 p-6">
					<p class="text-sm uppercase tracking-[.3em] text-[var(--amber)]">Certification Path</p>
					<h2 class="mt-4 text-3xl font-black">Learn. Build. Certify. Apply.</h2>
					<p class="mt-4 text-[var(--muted)]">
						From beginner AI concepts to real-world automation and applied AI systems.
					</p>

					<div class="mt-8 space-y-4">
						{#each ['AI Fundamentals', 'Prompt Engineering', 'Automation Workflows', 'Capstone Project'] as step, i}
							<div
								class="flex items-center gap-4 rounded-2xl border border-[var(--stroke-soft)] bg-white/[.04] p-4"
							>
								<span
									class="grid h-10 w-10 place-items-center rounded-xl bg-[var(--brand-grad)] font-bold"
								>
									{i + 1}
								</span>
								<span class="font-semibold">{step}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features -->
	<section id="programs" class="mx-auto max-w-7xl px-6 py-20">
		<div class="max-w-2xl">
			<p class="font-bold text-[var(--orange)]">What We Teach</p>
			<h2 class="mt-3 text-4xl font-black md:text-5xl">AI capabilities that create real value.</h2>
		</div>

		<div class="mt-12 grid gap-6 md:grid-cols-3">
			{#each features as feature}
				<article
					class="rounded-[2rem] border border-[var(--stroke)] bg-[var(--glass)] p-8 backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white/[.08]"
				>
					<div class="mb-6 text-5xl">
						<feature.icon class="mb-6 h-11 w-11 text-[var(--amber)]" />
					</div>
					<h3 class="text-2xl font-black">{feature.title}</h3>
					<p class="mt-4 leading-7 text-[var(--muted)]">{feature.text}</p>
				</article>
			{/each}
		</div>
	</section>

	<!-- Packages -->
	<section id="packages" class="mx-auto max-w-7xl px-6 py-20">
		<div class="text-center">
			<p class="font-bold text-[var(--gold)]">Training Packages</p>
			<h2 class="mt-3 text-4xl font-black md:text-5xl">Choose your path into AI.</h2>
		</div>

		<div class="mt-12 grid gap-6 lg:grid-cols-3">
			{#each packages as pkg}
				<article
					class={`relative rounded-[2rem] border p-8 backdrop-blur-2xl ${
						pkg.highlight
							? 'border-[var(--amber)] bg-white/[.09] shadow-2xl shadow-orange-950/30'
							: 'border-[var(--stroke)] bg-[var(--glass)]'
					}`}
				>
					{#if pkg.highlight}
						<div
							class="absolute right-6 top-6 rounded-full bg-[var(--brand-grad)] px-4 py-1 text-xs font-bold"
						>
							Popular
						</div>
					{/if}

					<h3 class="text-2xl font-black text-white">{pkg.name}</h3>
					<p class="mt-2 text-[var(--orange)]">{pkg.price}</p>

					<ul class="mt-8 space-y-4 text-[var(--muted)]">
						{#each pkg.items as item}
							<li class="flex gap-3">
								<span class="text-[var(--green)]">✓</span>
								<span>{item}</span>
							</li>
						{/each}
					</ul>

					<a
						href="#contact"
						class="mt-8 block rounded-full border border-[var(--stroke)] px-6 py-3 text-center font-bold hover:bg-[var(--amber)] hover:text-black"
					>
						Enquire Now
					</a>
				</article>
			{/each}
		</div>
	</section>

	<!-- Stats -->
	<section id="impact" class="mx-auto max-w-7xl px-6 py-20">
		<div
			class="rounded-[2rem] border border-[var(--stroke)] bg-[var(--glass)] p-8 backdrop-blur-2xl md:p-12"
		>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
				{#each stats as stat}
					<div class="rounded-3xl border border-[var(--stroke-soft)] bg-black/20 p-6 text-center">
						<p class="bg-[var(--brand-grad)] bg-clip-text text-4xl font-black text-white">
							{stat[0]}
						</p>
						<p class="mt-2 text-sm text-[var(--muted)]">{stat[1]}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA -->

	<!-- Testimonials -->
	<section class="mx-auto max-w-7xl px-6 py-20">
		<div class="text-center">
			<p class="font-bold text-[var(--orange)]">Testimonials</p>
			<h2 class="mt-3 text-4xl font-black md:text-5xl">Trusted by learners and businesses.</h2>
		</div>

		<div class="mt-12 grid gap-6 md:grid-cols-3">
			{#each testimonials as item}
				<article
					class="rounded-[2rem] border border-[var(--stroke)] bg-[var(--glass)] p-8 backdrop-blur-2xl"
				>
					<Quote class="mb-6 h-10 w-10 text-[var(--amber)]" />
					<p class="leading-8 text-[var(--muted)]">“{item.text}”</p>
					<div class="mt-8 border-t border-[var(--stroke-soft)] pt-5">
						<p class="font-bold text-white">{item.name}</p>
						<p class="text-sm text-[var(--muted-2)]">{item.role}</p>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<!-- FAQ -->
	<section class="mx-auto max-w-5xl px-6 py-20">
		<div class="text-center">
			<p class="font-bold text-[var(--gold)]">FAQ</p>
			<h2 class="mt-3 text-4xl font-black md:text-5xl">Common questions.</h2>
		</div>

		<div class="mt-12 space-y-4">
			{#each faqs as faq}
				<details
					class="group rounded-3xl border border-[var(--stroke)] bg-[var(--glass)] p-6 backdrop-blur-2xl"
				>
					<summary
						class="flex cursor-pointer list-none items-center justify-between gap-4 font-bold"
					>
						<span class="flex items-center gap-3">
							<HelpCircle class="h-5 w-5 text-[var(--amber)]" />
							{faq.q}
						</span>
						<span class="text-2xl text-[var(--muted)] transition group-open:rotate-45">+</span>
					</summary>
					<p class="mt-5 leading-7 text-[var(--muted)]">
						{faq.a}
					</p>
				</details>
			{/each}
		</div>
	</section>

	<section class=" px-6 py-24 text-center">
		{@render children()}
	</section>
	<!-- Footer -->
	<footer class="border-t border-[var(--stroke-soft)] px-6 py-10">
		<div
			class="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-[var(--muted)] md:flex-row"
		>
			<p>© {new Date().getFullYear()} Abyssiniya AI PLC. All rights reserved.</p>
			<div class="flex gap-6">
				<a href="#programs" class="hover:text-white">Programs</a>
				<a href="#packages" class="hover:text-white">Packages</a>
				<a href="#contact" class="hover:text-white">Contact</a>
			</div>
		</div>
	</footer>
</div>

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
		--glass: rgba(255, 255, 255, 0.075);
		--glass-2: rgba(255, 255, 255, 0.055);
		--stroke: rgba(255, 255, 255, 0.18);
		--stroke-soft: rgba(255, 255, 255, 0.11);
		--brand-grad: linear-gradient(
			90deg,
			var(--red) 0%,
			var(--orange) 30%,
			var(--gold) 52%,
			var(--green) 100%
		);
	}

	html {
		scroll-behavior: smooth;
	}

	:global(body) {
		margin: 0;
		background: var(--ink);
	}

	section {
		position: relative;
	}

	section::before {
		content: '';
		position: absolute;
		inset: 10% auto auto 50%;
		width: 70%;
		height: 1px;
		transform: translateX(-50%);
		background: linear-gradient(
			90deg,
			transparent,
			rgba(249, 188, 71, 0.25),
			rgba(58, 138, 18, 0.18),
			transparent
		);
		pointer-events: none;
	}
</style>
