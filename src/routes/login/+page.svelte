<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { loginSchema } from './schema';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { form, errors, enhance, submitting, message } = superForm(data.form, {
		validators: zod4Client(loginSchema),
		delayMs: 300
	});

	let showPassword = $state(false);
</script>

<svelte:head>
	<title>Sign In — Abyssinniya AI</title>
</svelte:head>

<div class="flex min-h-screen bg-[var(--ink)] text-[var(--txt)]">
	<!-- Left -->
	<aside
		class="hidden w-105 shrink-0 flex-col justify-between border-r border-[var(--stroke-soft)] px-10 py-10 lg:flex"
	>
		<div>
			<div class="mb-16 flex items-center gap-3">
				<a href="/">
					<img src="/logo.png" alt="Abyssiniya AI" class="h-16 mb-4 rounded-lg" />
					<p class="text-xs text-[var(--muted-2)]">Intelligent Systems</p>
				</a>
			</div>

			<div class="max-w-sm">
				<p class="mb-3 text-xs tracking-[0.18em] text-[var(--gold-soft)] uppercase">
					AI-Powered Solutions
				</p>

				<h1
					class="mb-5 text-3xl leading-tight text-[var(--txt)]"
					style="font-family: 'Cormorant Garamond', serif;"
				>
					Building intelligent tools for modern businesses.
				</h1>

				<p class="text-sm leading-7 text-[var(--muted)]">
					Secure access to AI workflows, automation tools, and operational intelligence.
				</p>
			</div>
		</div>

		<p class="text-xs text-[var(--muted-2)]">
			© {new Date().getFullYear()} Abyssinniya AI
		</p>
	</aside>

	<!-- Right -->
	<main class="flex flex-1 items-center justify-center px-6 py-12">
		<div class="w-full max-w-md">
			<!-- Mobile Logo -->
			<div class="mb-10 flex items-center gap-3 lg:hidden">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--stroke)] bg-[var(--glass)]"
				>
					<svg width="16" height="16" viewBox="0 0 18 18" fill="none">
						<path d="M2 9L9 2L16 9L9 16L2 9Z" stroke="var(--gold)" stroke-width="1.5" />
						<path d="M5 9L9 5L13 9L9 13L5 9Z" fill="var(--green)" opacity="0.45" />
					</svg>
				</div>

				<div>
					<p class="text-base tracking-[0.12em]" style="font-family: 'Cormorant Garamond', serif;">
						ABYSSINNIYA AI
					</p>
					<p class="text-xs text-[var(--muted-2)]">Intelligent Systems</p>
				</div>
			</div>

			<!-- Header -->
			<div class="mb-8">
				<h2 class="text-3xl text-[var(--txt)]" style="font-family: 'Cormorant Garamond', serif;">
					Sign In
				</h2>

				<p class="mt-2 text-sm text-[var(--muted-2)]">Enter your credentials to continue</p>
			</div>

			<!-- Server Message -->
			{#if $message}
				<div
					class="mb-5 rounded-md border border-[var(--red)]/30 bg-[var(--red)]/10 px-4 py-3 text-sm text-red-200"
				>
					{$message.text}
				</div>
			{/if}

			<form method="POST" id="login" action="?/login" use:enhance class="space-y-5">
				<!-- Email -->
				<div>
					<label
						for="email"
						class="mb-2 block text-xs tracking-[0.14em] text-[var(--muted)] uppercase"
					>
						Email
					</label>

					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						bind:value={$form.email}
						placeholder="you@company.com"
						aria-invalid={$errors.email ? 'true' : undefined}
						class="w-full rounded-md border bg-[var(--glass-2)] px-4 py-3 text-sm text-[var(--txt)] transition-all duration-200 outline-none placeholder:text-[var(--muted-2)] focus:border-[var(--gold)]/50"
						style:border-color={$errors.email ? 'rgba(196,42,12,0.55)' : 'var(--stroke-soft)'}
					/>

					{#if $errors.email}
						<p class="mt-1 text-xs text-red-300">
							{$errors.email}
						</p>
					{/if}
				</div>

				<!-- Password -->
				<div>
					<div class="mb-2 flex items-center justify-between">
						<label for="password" class="text-xs tracking-[0.14em] text-[var(--muted)] uppercase">
							Password
						</label>

						<a
							href="/forgot-password"
							class="text-xs text-[var(--gold-soft)] transition hover:text-[var(--gold)]"
						>
							Forgot password?
						</a>
					</div>

					<div class="relative">
						<input
							id="password"
							name="password"
							type={showPassword ? 'text' : 'password'}
							autocomplete="current-password"
							bind:value={$form.password}
							placeholder="••••••••"
							aria-invalid={$errors.password ? 'true' : undefined}
							class="w-full rounded-md border bg-[var(--glass-2)] px-4 py-3 pr-11 text-sm text-[var(--txt)] transition-all duration-200 outline-none placeholder:text-[var(--muted-2)] focus:border-[var(--gold)]/50"
							style:border-color={$errors.password ? 'rgba(196,42,12,0.55)' : 'var(--stroke-soft)'}
						/>

						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--muted-2)] transition hover:text-[var(--txt)]"
							aria-label={showPassword ? 'Hide password' : 'Show password'}
						>
							{#if showPassword}
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.75"
								>
									<path
										d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"
									/>
									<path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
									<line x1="1" y1="1" x2="23" y2="23" />
								</svg>
							{:else}
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.75"
								>
									<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
									<circle cx="12" cy="12" r="3" />
								</svg>
							{/if}
						</button>
					</div>

					{#if $errors.password}
						<p class="mt-1 text-xs text-red-300">
							{$errors.password}
						</p>
					{/if}
				</div>

				<!-- Submit -->
				<button
					type="submit"
					form="login"
					disabled={$submitting}
					class="mt-2 w-full rounded-md bg-[var(--gold)] py-3 text-sm font-semibold tracking-[0.08em] text-[var(--ink)] transition-all duration-200 hover:bg-[var(--amber)] disabled:cursor-not-allowed disabled:opacity-60"
				>
					{$submitting ? 'Signing in…' : 'Sign In'}
				</button>
			</form>

			<!-- Footer -->
			<div class="mt-8 border-t border-[var(--stroke-soft)] pt-6">
				<p class="text-center text-xs text-[var(--muted-2)]">
					Need access?
					<a href="/contact" class="text-[var(--gold-soft)] transition hover:text-[var(--gold)]">
						Contact administrator
					</a>
				</p>
			</div>
		</div>
	</main>
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
		--glass: rgba(255, 255, 255, 0.075);
		--glass-2: rgba(255, 255, 255, 0.055);
		--stroke: rgba(255, 255, 255, 0.18);
		--stroke-soft: rgba(255, 255, 255, 0.11);
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

	:global(body) {
		margin: 0;
		padding: 0;
		background: var(--ink);
		font-family: 'Outfit', sans-serif;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus {
		-webkit-text-fill-color: var(--txt);
		-webkit-box-shadow: 0 0 0px 1000px #101810 inset;
		transition: background-color 5000s ease-in-out 0s;
	}
</style>
