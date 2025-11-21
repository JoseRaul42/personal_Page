<script lang="ts">
	/**
	 * Advanced Animated Background Component
	 * Uses Svelte 5 runes, Canvas API, and sophisticated visual effects
	 * Features:
	 * - Animated canvas noise texture
	 * - Floating particles with physics
	 * - Dynamic gradient mesh
	 * - Parallax effect on mouse move
	 */

	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	// Reactive state using Svelte 5 runes
	let canvasRef = $state<HTMLCanvasElement | null>(null);
	let particlesCanvas = $state<HTMLCanvasElement | null>(null);
	let mouseX = $state(0);
	let mouseY = $state(0);

	// Spring physics for smooth mouse tracking
	const mouse = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.05,
			damping: 0.25
		}
	);

	// Particle system
	class Particle {
		x: number;
		y: number;
		size: number;
		speedX: number;
		speedY: number;
		opacity: number;
		hue: number;

		constructor(width: number, height: number) {
			this.x = Math.random() * width;
			this.y = Math.random() * height;
			this.size = Math.random() * 2 + 0.5;
			this.speedX = Math.random() * 0.5 - 0.25;
			this.speedY = Math.random() * 0.5 - 0.25;
			this.opacity = Math.random() * 0.5 + 0.1;
			this.hue = Math.random() * 20 + 10; // Orange-red hues
		}

		update(width: number, height: number, mouseInfluence: { x: number; y: number }) {
			// Mouse interaction - particles move away from cursor
			const dx = this.x - mouseInfluence.x;
			const dy = this.y - mouseInfluence.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const maxDistance = 200;

			if (distance < maxDistance) {
				const force = (maxDistance - distance) / maxDistance;
				this.x += (dx / distance) * force * 2;
				this.y += (dy / distance) * force * 2;
			}

			// Normal movement
			this.x += this.speedX;
			this.y += this.speedY;

			// Wrap around edges
			if (this.x < 0) this.x = width;
			if (this.x > width) this.x = 0;
			if (this.y < 0) this.y = height;
			if (this.y > height) this.y = 0;

			// Pulse opacity
			this.opacity += Math.sin(Date.now() * 0.001 + this.x) * 0.002;
			this.opacity = Math.max(0.1, Math.min(0.6, this.opacity));
		}

		draw(ctx: CanvasRenderingContext2D) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.opacity})`;
			ctx.fill();

			// Glow effect
			ctx.shadowBlur = 10;
			ctx.shadowColor = `hsla(${this.hue}, 100%, 60%, ${this.opacity * 0.5})`;
		}
	}

	// Noise generation function
	function generateNoise(
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		time: number
	) {
		const imageData = ctx.createImageData(width, height);
		const data = imageData.data;

		for (let i = 0; i < data.length; i += 4) {
			const x = (i / 4) % width;
			const y = Math.floor(i / 4 / width);

			// Perlin-like noise using sine waves
			const noise =
				Math.sin(x * 0.05 + time * 0.0005) * Math.cos(y * 0.05 + time * 0.0003) +
				Math.sin(x * 0.02 + time * 0.0002) * Math.cos(y * 0.02 + time * 0.0004);

			const value = ((noise + 2) / 4) * 255;

			// Create subtle colored noise (dark with orange tint)
			data[i] = value * 0.3; // R
			data[i + 1] = value * 0.2; // G
			data[i + 2] = value * 0.15; // B
			data[i + 3] = value * 0.08; // A (very subtle)
		}

		ctx.putImageData(imageData, 0, 0);
	}

	// Animated gradient mesh
	function drawGradientMesh(
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		time: number
	) {
		// Create multiple moving radial gradients
		const gradients = [
			{
				x: width * 0.2 + Math.sin(time * 0.0003) * 100,
				y: height * 0.3 + Math.cos(time * 0.0002) * 100,
				color: 'rgba(255, 107, 53, 0.03)'
			},
			{
				x: width * 0.8 + Math.sin(time * 0.0004) * 150,
				y: height * 0.7 + Math.cos(time * 0.0003) * 150,
				color: 'rgba(255, 140, 95, 0.02)'
			},
			{
				x: width * 0.5 + Math.sin(time * 0.0002) * 80,
				y: height * 0.5 + Math.cos(time * 0.0005) * 80,
				color: 'rgba(255, 107, 53, 0.025)'
			}
		];

		gradients.forEach((g) => {
			const gradient = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, 400);
			gradient.addColorStop(0, g.color);
			gradient.addColorStop(1, 'transparent');
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, width, height);
		});
	}

	onMount(() => {
		if (!canvasRef || !particlesCanvas) return;

		const canvas = canvasRef;
		const pCanvas = particlesCanvas;
		const ctx = canvas.getContext('2d', { alpha: true });
		const pCtx = pCanvas.getContext('2d', { alpha: true });

		if (!ctx || !pCtx) return;

		// Set canvas sizes
		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			pCanvas.width = window.innerWidth;
			pCanvas.height = window.innerHeight;
		};
		resize();
		window.addEventListener('resize', resize);

		// Create particles
		const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000));
		const particles: Particle[] = [];
		for (let i = 0; i < particleCount; i++) {
			particles.push(new Particle(canvas.width, canvas.height));
		}

		// Mouse tracking with parallax
		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
			mouse.set({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener('mousemove', handleMouseMove);

		// Animation loop
		let animationId: number;

		const animate = (time: number) => {
			// Clear canvases
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

			// Draw animated gradient mesh
			drawGradientMesh(ctx, canvas.width, canvas.height, time);

			// Draw animated noise texture (every few frames for performance)
			if (Math.floor(time / 100) % 2 === 0) {
				generateNoise(ctx, canvas.width, canvas.height, time);
			}

			// Update and draw particles
			const mouseInfluence = { x: mouseX, y: mouseY };
			particles.forEach((particle) => {
				particle.update(pCanvas.width, pCanvas.height, mouseInfluence);
				particle.draw(pCtx);
			});

			// Draw connecting lines between nearby particles
			pCtx.strokeStyle = 'rgba(255, 107, 53, 0.05)';
			pCtx.lineWidth = 0.5;
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance < 150) {
						pCtx.beginPath();
						pCtx.moveTo(particles[i].x, particles[i].y);
						pCtx.lineTo(particles[j].x, particles[j].y);
						pCtx.globalAlpha = (150 - distance) / 150;
						pCtx.stroke();
						pCtx.globalAlpha = 1;
					}
				}
			}

			animationId = requestAnimationFrame(animate);
		};

		animationId = requestAnimationFrame(animate);

		// Cleanup
		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', resize);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<!-- Multiple layered canvases for complex effects -->
<div class="fixed inset-0 -z-10 overflow-hidden bg-[#050608]">
	<!-- Base gradient layer -->
	<div class="absolute inset-0 bg-gradient-to-br from-[#050608] via-[#0a0c0f] to-[#050608]"></div>

	<!-- Animated noise and gradient mesh canvas -->
	<canvas bind:this={canvasRef} class="canvas-screen absolute inset-0 opacity-100"></canvas>

	<!-- Particles canvas -->
	<canvas bind:this={particlesCanvas} class="canvas-screen absolute inset-0 opacity-60"></canvas>

	<!-- Static overlay texture for depth -->
	<div class="texture-overlay absolute inset-0 opacity-30"></div>

	<!-- Vignette effect -->
	<div class="vignette absolute inset-0"></div>
</div>

<style>
	canvas {
		image-rendering: pixelated;
		image-rendering: -moz-crisp-edges;
		image-rendering: crisp-edges;
	}

	.canvas-screen {
		mix-blend-mode: screen;
	}

	.texture-overlay {
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E");
		mix-blend-mode: overlay;
	}

	.vignette {
		background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
	}
</style>
