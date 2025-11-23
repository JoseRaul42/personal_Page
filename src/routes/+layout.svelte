<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ShaderBackground from '$lib/components/ShaderBackground.svelte';

	let { children } = $props();

	// Navigation state
	let mobileMenuOpen = $state(false);

	const navItems = [
		{ id: 'hero', label: 'Home' },
		{ id: 'about', label: 'About' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'music', label: 'Music' },
		{ id: 'stack', label: 'Stack' }
	];

	function scrollToSection(sectionId: string) {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			mobileMenuOpen = false;
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<!-- GPU-accelerated WebGL shader background -->
<ShaderBackground />

<div class="flex min-h-screen flex-col">
	<!-- Header Navigation -->
	<header
		class="fixed top-0 right-0 left-0 z-50 border-b border-[#ff6b35]/10 bg-[#050608]/80 backdrop-blur-md"
	>
		<nav class="container mx-auto px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
			<div class="flex items-center justify-between">
				<!-- Logo/Brand -->
				<button
					onclick={() => scrollToSection('hero')}
					class="text-xl font-bold text-[#ff6b35] transition-colors hover:text-[#ff8c5f]"
				>
					J.V.
				</button>

				<!-- Desktop Navigation -->
				<div class="hidden items-center gap-8 md:flex">
					{#each navItems as item (item.id)}
						<button
							onclick={() => scrollToSection(item.id)}
							class="text-sm font-medium text-[#a0a0a0] transition-colors hover:text-[#ff6b35]"
						>
							{item.label}
						</button>
					{/each}
				</div>

				<!-- Mobile Menu Button -->
				<button
					onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
					class="p-2 text-[#ff6b35] md:hidden"
					aria-label="Toggle menu"
					aria-expanded={mobileMenuOpen}
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{#if mobileMenuOpen}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						{:else}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						{/if}
					</svg>
				</button>
			</div>

			<!-- Mobile Menu -->
			{#if mobileMenuOpen}
				<div class="mt-4 border-t border-[#ff6b35]/10 pt-4 pb-4 md:hidden">
					{#each navItems as item (item.id)}
						<button
							onclick={() => scrollToSection(item.id)}
							class="block w-full py-2 text-left text-[#a0a0a0] transition-colors hover:text-[#ff6b35]"
						>
							{item.label}
						</button>
					{/each}
				</div>
			{/if}
		</nav>
	</header>

	<!-- Main Content -->
	<main class="flex-1 pt-16">
		{@render children()}
	</main>

	<!-- Footer -->
	<footer class="mt-20 border-t border-[#ff6b35]/10 bg-[#0a0c0f] py-8">
		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
				<p class="text-sm text-[#606060]">
					© {new Date().getFullYear()} Jose Valois. Built with Svelte 5 + TailwindCSS.
				</p>
				<div class="flex gap-6">
					<!-- TODO: Add your social links here -->
					<a
						href="https://github.com/JoseRaul42"
						target="_blank"
						rel="noopener noreferrer"
						class="text-[#a0a0a0] transition-colors hover:text-[#ff6b35]"
						aria-label="GitHub"
					>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								fill-rule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
					<a
						href="https://www.linkedin.com/in/jose-valois-29a120213"
						target="_blank"
						rel="noopener noreferrer"
						class="text-[#a0a0a0] transition-colors hover:text-[#ff6b35]"
						aria-label="LinkedIn"
					>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</footer>
</div>
