<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import YouTubePlayer from '$lib/components/YouTubePlayer.svelte';
	import { projects } from '$lib/config/projects';
	import { gifs } from '$lib/config/gifs';
	import { techStack } from '$lib/config/stack';
	
	

	interface Playlist {
		id: string;
		name: string;
		description: string;
		imageUrl: string;
		spotifyUrl: string;
		trackCount: number;
	}

	// State for Spotify playlists
	let playlists = $state<Playlist[]>([]);
	let playlistsLoading = $state(true);
	let playlistsError = $state(false);

	// State for YouTube player
	/**
	 * TODO: Replace these with your favorite YouTube video IDs
	 * Find video IDs in YouTube URLs: https://www.youtube.com/watch?v=[VIDEO_ID]
	 */
	const musicVideos = [
		{ id: 'wW7WgqF4yoo', label: 'Wildflower' },
		{ id: '3Q18F--zZ-I', label: 'My little brown book' },
		{ id: 'SyoJ5e63-SA', label: 'Echo Sax No. 4' }
	];
	let selectedVideoIndex = $state(0);

	onMount(() => {
		// Fetch Spotify playlists
		fetchPlaylists();

		// Set up intersection observer for scroll animations
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('is-visible');
					}
				});
			},
			{ threshold: 0.1 }
		);

		// Observe all sections
		document.querySelectorAll('.animate-on-scroll').forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	});

	async function fetchPlaylists() {
		try {
			const response = await fetch('/api/spotify/playlists');
			if (response.ok) {
				playlists = await response.json();
			} else {
				playlistsError = true;
			}
		} catch (error) {
			console.error('Failed to fetch playlists:', error);
			playlistsError = true;
		} finally {
			playlistsLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Jose Valois | Technical Excellence & Creative Systems</title>
	<meta
		name="description"
		content="Personal website of a technically focused data engineer building thoughtful systems."
	/>
</svelte:head>

<!-- Hero Section -->
<section id="hero" class="relative flex min-h-screen items-center justify-center overflow-hidden">
	<!-- Animated background elements -->
	<div class="pointer-events-none absolute inset-0">
		<div
			class="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-[#ff6b35] opacity-5 blur-3xl"
			style="animation-duration: 4s;"
		></div>
		<div
			class="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-[#ff6b35] opacity-5 blur-3xl"
			style="animation-duration: 6s; animation-delay: 1s;"
		></div>
	</div>

	<div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-4xl text-center">
			<h1
				class="animate-on-scroll mb-6 text-5xl font-bold text-[#ff6b35] sm:text-6xl lg:text-7xl"
				in:fly={{ y: 30, duration: 800, delay: 200 }}
			>
				Jose <span class="text-[#ff8c5f]">Valois</span>
			</h1>
			<p
				class="animate-on-scroll mb-8 text-xl text-[#a0a0a0] sm:text-2xl"
				in:fly={{ y: 30, duration: 800, delay: 400 }}
			>
				Data Conversion and Integration Developer
			</p>
			<p
				class="animate-on-scroll mx-auto mb-12 max-w-2xl text-lg text-[#606060]"
				in:fly={{ y: 30, duration: 800, delay: 600 }}
			>
				My experience has been built through software implentations in upstream accounting systems, document management systems, and EHR conversions.
			</p>
			<div
				class="animate-on-scroll flex flex-wrap justify-center gap-4"
				in:fly={{ y: 30, duration: 800, delay: 800 }}
			>
				<a
					href="#about"
					class="rounded-lg bg-[#ff6b35] px-8 py-3 font-medium text-white shadow-lg transition-all hover:scale-105 hover:bg-[#ff8c5f] hover:shadow-[#ff6b35]/50"
				>
					Learn More
				</a>
				<a
					href="#projects"
					class="rounded-lg border-2 border-[#ff6b35] px-8 py-3 font-medium text-[#ff6b35] transition-all hover:scale-105 hover:bg-[#ff6b35] hover:text-white"
				>
					View Projects
				</a>
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
		<svg class="h-6 w-6 text-[#ff6b35]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M19 14l-7 7m0 0l-7-7m7 7V3"
			/>
		</svg>
	</div>
</section>

<!-- About Me Section -->
<section id="about" class="animate-on-scroll py-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-12 text-center text-4xl font-bold text-[#ff6b35] sm:text-5xl">About Me</h2>

			<div class="grid items-center gap-12 md:grid-cols-2">
				<!-- Left: Text content -->
				<div class="space-y-6">
					<p class="text-lg leading-relaxed text-[#a0a0a0]">
						
    I'm a self taught engineer adept at working with SQL, C#, .NET, PowerShell,
    Node.js, and Azure DevOps. I’ve successfully delivered scalable data
    solutions and backend software application support. My experience has been
    built through delivering complex, data-driven projects
					</p>
					<p class="text-lg leading-relaxed text-[#a0a0a0]">
						 In my free time, I like to explore use cases for locally hosted LLMs on consumer-grade hardware for privacy focused personal AI projects. I also enjoy discovering new music and playing Arc Raiders.
					</p>

					<!-- TODO: Customize these skills based on your experience -->
					<div class="pt-4">
						<h3 class="mb-4 text-xl font-semibold text-[#ff6b35]">Core Competencies</h3>
						<div class="flex flex-wrap gap-3">
							{#each ['Data Engineering', 'ETL/ELT', 'SQL Optimization', '.NET Development'] as skill (skill)}
								<span
									class="rounded-full border border-[#ff6b35]/30 bg-[#0a0c0f] px-4 py-2 text-sm font-medium text-[#ff6b35] transition-colors hover:bg-[#ff6b35]/10"
								>
									{skill}
								</span>
							{/each}
						</div>
					</div>
				</div>

				<!-- Right: Decorative panel with stats -->
				<div class="relative">
					<div
						class="rounded-2xl border border-[#ff6b35]/20 bg-gradient-to-br from-[#0a0c0f] to-[#050608] p-8 shadow-2xl transition-shadow hover:shadow-[#ff6b35]/20"
					>
						<div class="space-y-8">
							<!-- TODO: Update these stats with your actual metrics -->
							<div class="border-l-4 border-[#ff6b35] pl-6">
								<div class="mb-2 text-4xl font-bold text-[#ff6b35]">5+</div>
								<div class="text-[#a0a0a0]">Years of Experience</div>
							</div>
						
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Projects Section -->
<section id="projects" class="animate-on-scroll bg-[#0a0c0f]/50 py-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-4 text-center text-4xl font-bold text-[#ff6b35] sm:text-5xl">
				Personal Projects
			</h2>
			<p class="mx-auto mb-12 max-w-2xl text-center text-[#a0a0a0]">
				Personal projects built with some of my favorite development tools.
			</p>

			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each projects as project (project.githubUrl)}
					<div
						class="group rounded-xl border border-[#ff6b35]/10 bg-[#050608] p-6 transition-all duration-300 hover:scale-105 hover:border-[#ff6b35]/50 hover:shadow-xl hover:shadow-[#ff6b35]/10"
					>
						<div class="mb-4">
							<h3 class="mb-2 text-xl font-bold text-[#ff6b35] group-hover:text-[#ff8c5f]">
								{project.name}
							</h3>
							<p class="text-sm leading-relaxed text-[#a0a0a0]">
								{project.description}
							</p>
						</div>

						<div class="mb-4 flex flex-wrap gap-2">
							{#each project.techStack as tech (tech)}
								<span
									class="rounded border border-[#ff6b35]/20 bg-[#0a0c0f] px-2 py-1 text-xs text-[#606060]"
								>
									{tech}
								</span>
							{/each}
						</div>

						<a
							href={project.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							data-sveltekit-reload
							class="inline-flex items-center gap-2 text-sm font-medium text-[#ff6b35] transition-colors hover:text-[#ff8c5f]"
						>
							View on GitHub
							<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
								<path
									d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
								/>
							</svg>
						</a>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Spotify Playlists Section -->
<!-- <section id="playlists" class="animate-on-scroll py-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-4 text-center text-4xl font-bold text-[#ff6b35] sm:text-5xl">
				Favorite Playlists
			</h2>
			<p class="mx-auto mb-12 max-w-2xl text-center text-[#a0a0a0]">
				A selection of playlists that I enjoy listening to.
			</p>

			{#if playlistsLoading}
				<div class="flex items-center justify-center py-12">
					<div class="h-12 w-12 animate-spin rounded-full border-b-2 border-[#ff6b35]"></div>
				</div>
			{:else if playlistsError}
				<div class="py-12 text-center text-[#606060]">
					<p>Unable to load playlists. Check your Spotify API configuration.</p>
				</div>
			{:else}
				<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each playlists as playlist (playlist.id)}
						<a
							href={playlist.spotifyUrl}
							target="_blank"
							rel="noopener noreferrer"
							data-sveltekit-reload
							class="group overflow-hidden rounded-xl border border-[#ff6b35]/10 bg-[#050608] transition-all duration-300 hover:scale-105 hover:border-[#ff6b35]/50 hover:shadow-xl hover:shadow-[#ff6b35]/10"
						>
							<div class="aspect-square overflow-hidden">
								<img
									src={playlist.imageUrl}
									alt={playlist.name}
									class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
									loading="lazy"
								/>
							</div>
							<div class="p-6">
								<h3 class="mb-2 text-xl font-bold text-[#ff6b35] group-hover:text-[#ff8c5f]">
									{playlist.name}
								</h3>
								<p class="mb-3 line-clamp-2 text-sm text-[#a0a0a0]">
									{playlist.description || 'No description available'}
								</p>
								<div class="flex items-center gap-2 text-sm text-[#606060]">
									<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
										/>
									</svg>
									<span>{playlist.trackCount} tracks</span>
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section> -->

<!-- YouTube Music Player Section -->
<section id="music" class="animate-on-scroll bg-[#0a0c0f]/50 py-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-4xl">
			<h2 class="mb-4 text-center text-4xl font-bold text-[#ff6b35] sm:text-5xl">
				Music
			</h2>
			<p class="mb-8 text-center text-[#a0a0a0]">
				A selection of music that I enjoy listening to.
			</p>

			<!-- Video selector buttons -->
			<div class="mb-8 flex flex-wrap justify-center gap-4">
				{#each musicVideos as video, index (video.id)}
					<button
						onclick={() => (selectedVideoIndex = index)}
						class="rounded-lg px-6 py-3 font-medium transition-all {selectedVideoIndex === index
							? 'bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/30'
							: 'border border-[#ff6b35]/20 bg-[#0a0c0f] text-[#a0a0a0] hover:border-[#ff6b35]/50'}"
					>
						{video.label}
					</button>
				{/each}
			</div>

			<!-- YouTube Player -->
			<YouTubePlayer
				videoId={musicVideos[selectedVideoIndex].id}
				title={musicVideos[selectedVideoIndex].label}
			/>
		</div>
	</div>
</section>

<!-- Favorite GIFs Section -->
<!-- <section id="gifs" class="animate-on-scroll py-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-4 text-center text-4xl font-bold text-[#ff6b35] sm:text-5xl">
				Favorite Moments
			</h2>
			<p class="mx-auto mb-12 max-w-2xl text-center text-[#a0a0a0]">
				Because every data engineer needs a sense of humor.
			</p>

			<div class="grid grid-cols-2 gap-6 md:grid-cols-3">
				{#each gifs as gif (gif.url)}
					<div
						class="group relative overflow-hidden rounded-xl border border-[#ff6b35]/10 bg-[#050608] transition-all duration-300 hover:scale-105 hover:border-[#ff6b35]/50 hover:shadow-xl hover:shadow-[#ff6b35]/10"
					>
						<div class="aspect-square overflow-hidden">
							<img src={gif.url} alt={gif.alt} class="h-full w-full object-cover" loading="lazy" />
						</div>
						<div
							class="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-[#050608] to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<p class="text-sm font-medium text-[#ff6b35]">{gif.caption}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section> -->

<!-- Tech Stack Section -->
<section id="stack" class="animate-on-scroll bg-[#0a0c0f]/50 py-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-4 text-center text-4xl font-bold text-[#ff6b35] sm:text-5xl">Tech Stack</h2>
			<p class="mx-auto mb-12 max-w-2xl text-center text-[#a0a0a0]">
				Tools and technologies I enjoy working with.
			</p>

			<div class="space-y-12">
				{#each techStack as category (category.name)}
					<div>
						<h3 class="mb-6 text-2xl font-bold text-[#ff8c5f]">{category.name}</h3>
						<div class="flex flex-wrap gap-3">
							{#each category.tools as tool (tool.name)}
								<div
									class="group rounded-lg border border-[#ff6b35]/20 bg-[#050608] px-5 py-3 transition-all duration-300 hover:scale-105 hover:border-[#ff6b35]/60 hover:bg-[#ff6b35]/5 hover:shadow-lg hover:shadow-[#ff6b35]/10"
								>
									<span
										class="font-medium text-[#a0a0a0] transition-colors group-hover:text-[#ff6b35]"
									>
										{#if tool.icon}
											<span class="mr-2">{tool.icon}</span>
										{/if}
										{tool.name}
									</span>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	/* Scroll animation setup */
	.animate-on-scroll {
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.6s ease-out,
			transform 0.6s ease-out;
	}

	/* Applied via JavaScript when element is visible */
	:global(.animate-on-scroll.is-visible) {
		opacity: 1;
		transform: translateY(0);
	}

	/* Line clamp utility */
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
