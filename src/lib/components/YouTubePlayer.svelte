<script lang="ts">
	/**
	 * YouTube Player Component
	 *
	 * Embeds a YouTube video with responsive sizing
	 * Uses youtube-nocookie.com for enhanced privacy
	 */

	interface Props {
		videoId: string;
		title?: string;
		autoplay?: boolean;
		muted?: boolean;
	}

	let {
		videoId,
		title = 'YouTube video player',
		autoplay = true,
		muted = false
	}: Props = $props();

	// Construct YouTube embed URL with privacy-enhanced domain
	const embedUrl = $derived(() => {
		const params = new URLSearchParams({
			autoplay: autoplay ? '1' : '1',
			mute: muted ? '1' : '0',
			rel: '0', // Don't show related videos from other channels
			modestbranding: '1' // Minimal YouTube branding
		});
		return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
	});
</script>

<div class="youtube-player-wrapper">
	<iframe
		src={embedUrl()}
		{title}
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
		class="youtube-player-iframe"
	></iframe>
</div>

<style>
	.youtube-player-wrapper {
		position: relative;
		width: 100%;
		padding-bottom: 56.25%; /* 16:9 aspect ratio */
		height: 0;
		overflow: hidden;
		border-radius: 0.5rem;
		box-shadow: 0 10px 40px rgba(255, 107, 53, 0.1);
	}

	.youtube-player-iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 0.5rem;
	}
</style>
