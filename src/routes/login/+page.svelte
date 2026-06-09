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
	<title>Sign In — Lalo Import & Export</title>
</svelte:head>

<div class="flex min-h-screen bg-[#162734] text-white">
	<!-- Left -->
	<aside
		class="hidden w-105 shrink-0 flex-col justify-between border-r border-white/5 px-10 py-10 lg:flex"
	>
		<div>
			<div class="mb-16 flex items-center gap-3">
				<div class="flex h-9 w-9 items-center justify-center rounded-md border border-white/15">
					<svg
						width="18"
						height="18"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M2 9L9 2L16 9L9 16L2 9Z" stroke="#94b8cc" stroke-width="1.5" />
						<path d="M5 9L9 5L13 9L9 13L5 9Z" fill="#94b8cc" opacity="0.35" />
					</svg>
				</div>

				<div>
					<p class="text-lg tracking-[0.12em]" style="font-family: 'Cormorant Garamond', serif;">
						LALO
					</p>
					<p class="text-xs text-white/35">Import & Export</p>
				</div>
			</div>

			<div class="max-w-sm">
				<p class="mb-3 text-xs tracking-[0.18em] text-[#94b8cc]/50 uppercase">
					Global Trade Solutions
				</p>

				<h1
					class="mb-5 text-3xl leading-tight text-white/90"
					style="font-family: 'Cormorant Garamond', serif;"
				>
					Connecting businesses through reliable international trade.
				</h1>

				<p class="text-sm leading-7 text-white/45">
					Secure access to logistics, procurement, and operational systems.
				</p>
			</div>
		</div>

		<p class="text-xs text-white/20">
			© {new Date().getFullYear()} Lalo Import & Export
		</p>
	</aside>

	<!-- Right -->
	<main class="flex flex-1 items-center justify-center px-6 py-12">
		<div class="w-full max-w-md">
			<!-- Mobile Logo -->
			<div class="mb-10 flex items-center gap-3 lg:hidden">
				<div class="flex h-8 w-8 items-center justify-center rounded-md border border-white/15">
					<svg
						width="16"
						height="16"
						viewBox="0 0 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M2 9L9 2L16 9L9 16L2 9Z" stroke="#94b8cc" stroke-width="1.5" />
						<path d="M5 9L9 5L13 9L9 13L5 9Z" fill="#94b8cc" opacity="0.35" />
					</svg>
				</div>

				<div>
					<p class="text-base tracking-[0.12em]" style="font-family: 'Cormorant Garamond', serif;">
						LALO
					</p>
					<p class="text-xs text-white/35">Import & Export</p>
				</div>
			</div>

			<!-- Header -->
			<div class="mb-8">
				<h2 class="text-3xl text-white" style="font-family: 'Cormorant Garamond', serif;">
					Sign In
				</h2>

				<p class="mt-2 text-sm text-white/40">Enter your credentials to continue</p>
			</div>

			<!-- Server Message -->
			{#if $message}
				<div
					class="mb-5 rounded-md border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-200"
				>
					{$message.text}
				</div>
			{/if}

			<form method="POST" action="?/login" use:enhance class="space-y-5">
				<!-- Email -->
				<div>
					<label for="email" class="mb-2 block text-xs tracking-[0.14em] text-white/45 uppercase">
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
						class="w-full rounded-md border bg-white/[0.04] px-4 py-3 text-sm text-white transition-all duration-200 outline-none placeholder:text-white/20 focus:border-[#94b8cc]/40"
						style:border-color={$errors.email ? 'rgba(239,68,68,0.45)' : 'rgba(255,255,255,0.08)'}
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
						<label for="password" class="text-xs tracking-[0.14em] text-white/45 uppercase">
							Password
						</label>

						<a
							href="/forgot-password"
							class="text-xs text-[#94b8cc]/70 transition hover:text-[#94b8cc]"
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
							class="w-full rounded-md border bg-white/[0.04] px-4 py-3 pr-11 text-sm text-white transition-all duration-200 outline-none placeholder:text-white/20 focus:border-[#94b8cc]/40"
							style:border-color={$errors.password
								? 'rgba(239,68,68,0.45)'
								: 'rgba(255,255,255,0.08)'}
						/>

						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="absolute top-1/2 right-3 -translate-y-1/2 text-white/35 transition hover:text-white/70"
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
					disabled={$submitting}
					class="mt-2 w-full rounded-md bg-[#94b8cc] py-3 text-sm font-semibold tracking-[0.08em] text-[#142938] transition-all duration-200 hover:bg-[#aac7d8] disabled:cursor-not-allowed disabled:opacity-60"
				>
					{$submitting ? 'Signing in…' : 'Sign In'}
				</button>
			</form>

			<!-- Footer -->
			<div class="mt-8 border-t border-white/5 pt-6">
				<p class="text-center text-xs text-white/25">
					Need access?
					<a href="/contact" class="text-[#94b8cc]/70 transition hover:text-[#94b8cc]">
						Contact administrator
					</a>
				</p>
			</div>
		</div>
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background: #162734;
		font-family: 'Outfit', sans-serif;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus {
		-webkit-text-fill-color: white;
		-webkit-box-shadow: 0 0 0px 1000px #1c3140 inset;
		transition: background-color 5000s ease-in-out 0s;
	}
</style>
