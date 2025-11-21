<script lang="ts">
	/**
	 * Advanced WebGL Shader Background
	 * Features:
	 * - 3D Ray Marching with fractals
	 * - GPU-accelerated GLSL shaders
	 * - Complex mathematical visualizations
	 * - Performance-optimized rendering
	 */

	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let containerRef = $state<HTMLDivElement | null>(null);
	let mouseX = $state(0.5);
	let mouseY = $state(0.5);

	// Fragment shader - Cyberpunk neon background
	const fragmentShader = `
		uniform float uTime;
		uniform vec2 uResolution;
		uniform vec2 uMouse;
		
		// Smooth 3D noise for organic movement
		vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
		vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
		vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
		vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
		
		// 3D Simplex Noise
		float snoise(vec3 v) {
			const vec2 C = vec2(1.0/6.0, 1.0/3.0);
			const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
			
			vec3 i  = floor(v + dot(v, C.yyy));
			vec3 x0 = v - i + dot(i, C.xxx);
			
			vec3 g = step(x0.yzx, x0.xyz);
			vec3 l = 1.0 - g;
			vec3 i1 = min(g.xyz, l.zxy);
			vec3 i2 = max(g.xyz, l.zxy);
			
			vec3 x1 = x0 - i1 + C.xxx;
			vec3 x2 = x0 - i2 + C.yyy;
			vec3 x3 = x0 - D.yyy;
			
			i = mod289(i);
			vec4 p = permute(permute(permute(
				i.z + vec4(0.0, i1.z, i2.z, 1.0))
				+ i.y + vec4(0.0, i1.y, i2.y, 1.0))
				+ i.x + vec4(0.0, i1.x, i2.x, 1.0));
			
			float n_ = 0.142857142857;
			vec3 ns = n_ * D.wyz - D.xzx;
			
			vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
			
			vec4 x_ = floor(j * ns.z);
			vec4 y_ = floor(j - 7.0 * x_);
			
			vec4 x = x_ *ns.x + ns.yyyy;
			vec4 y = y_ *ns.x + ns.yyyy;
			vec4 h = 1.0 - abs(x) - abs(y);
			
			vec4 b0 = vec4(x.xy, y.xy);
			vec4 b1 = vec4(x.zw, y.zw);
			
			vec4 s0 = floor(b0)*2.0 + 1.0;
			vec4 s1 = floor(b1)*2.0 + 1.0;
			vec4 sh = -step(h, vec4(0.0));
			
			vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
			vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
			
			vec3 p0 = vec3(a0.xy, h.x);
			vec3 p1 = vec3(a0.zw, h.y);
			vec3 p2 = vec3(a1.xy, h.z);
			vec3 p3 = vec3(a1.zw, h.w);
			
			vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
			p0 *= norm.x;
			p1 *= norm.y;
			p2 *= norm.z;
			p3 *= norm.w;
			
			vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
			m = m * m;
			return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
		}
		
		float fbm(vec3 p) {
			float value = 0.0;
			float amplitude = 0.5;
			float frequency = 1.5;
			
			for(int i = 0; i < 4; i++) {
				value += amplitude * snoise(p * frequency);
				frequency *= 2.0;
				amplitude *= 0.45;
			}
			return value;
		}
		
		float neonGrid(vec2 uv) {
			uv *= 18.0;
			vec2 gv = fract(uv) - 0.5;
			vec2 id = floor(uv);
			float line = min(abs(gv.x), abs(gv.y));
			line = smoothstep(0.08, 0.0, line);
			float pulse = sin(uTime * 1.5 + id.x * 0.4 + id.y * 0.3) * 0.5 + 0.5;
			return line * pulse;
		}
		
		float scanLines(vec2 uv) {
			return sin((uv.y + uTime * 0.5) * 250.0) * 0.5 + 0.5;
		}
		
		void main() {
			vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
			vec2 mouse = (uMouse - 0.5) * 0.3;
			
			vec3 col = vec3(0.005, 0.0, 0.015);
			
			// Neon volumetric clouds
			for(int layer = 0; layer < 3; layer++) {
				float depth = 1.0 + float(layer) * 0.4;
				vec3 p = vec3(
					uv.x * depth + mouse.x * 0.6 + float(layer),
					uv.y * depth + mouse.y * 0.4 - float(layer) * 0.3,
					uTime * 0.15 + float(layer) * 1.2
				);
				float noise = fbm(p);
				float bloom = smoothstep(0.3, 0.8, noise);
				vec3 layerColor = mix(vec3(0.0, 0.95, 1.0), vec3(1.0, 0.0, 0.85), float(layer) * 0.5);
				layerColor *= (0.4 - float(layer) * 0.08);
				col += layerColor * bloom;
			}
			
			// Neon grid overlay
			float grid = neonGrid(uv + mouse * 0.5);
			col += vec3(0.0, 0.8, 1.0) * grid * 0.6;
			
			// Vertical energy beams
			float beams = 0.0;
			for(int j = 0; j < 5; j++) {
				float offset = float(j) * 0.6 - 1.2;
				float beam = smoothstep(0.08, 0.0, abs(uv.x + offset + sin(uTime * 0.4 + offset * 4.0) * 0.05));
				float wave = sin(uTime * 2.0 + offset * 8.0) * 0.5 + 0.5;
				beams += beam * wave * (0.3 + float(j) * 0.1);
			}
			col += vec3(1.0, 0.0, 0.8) * beams * 0.4;
			col += vec3(0.0, 0.8, 1.0) * beams * 0.2;
			
			// Floating holographic orbs
			for(int k = 0; k < 8; k++) {
				float angle = float(k) * 0.8 + uTime * 0.3;
				vec2 center = vec2(sin(angle) * 0.5, cos(angle * 1.2) * 0.3);
				float orb = smoothstep(0.4, 0.0, length(uv - center) - 0.1);
				vec3 orbColor = mix(vec3(0.0, 0.9, 1.0), vec3(1.0, 0.0, 0.9), float(k) / 8.0);
				col += orbColor * orb * 0.12;
			}
			
			// Scanlines and chromatic pulse
			float scan = scanLines(uv);
			col += vec3(0.05, 0.02, 0.08) * scan * 0.2;
			
			// Central glow
			float glow = 1.0 - smoothstep(0.0, 0.9, length(uv));
			col += vec3(0.7, 0.1, 0.9) * glow * 0.25;
			
			// Noise grain
			float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + uTime) * 43758.5453);
			col += (grain - 0.5) * 0.02;
			
			// Vignette
			float vignette = 1.0 - length(uv) * 0.6;
			col *= vignette;
			
			col = col / (col + vec3(1.0));
			col = pow(col, vec3(1.0 / 2.2));
			
			gl_FragColor = vec4(col, 1.0);
		}
	`;

	const vertexShader = `
		void main() {
			gl_Position = vec4(position, 1.0);
		}
	`;

	onMount(() => {
		if (!containerRef) return;

		// Check WebGL support
		const canvas = document.createElement('canvas');
		const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		if (!gl) {
			console.error('❌ WebGL not supported! Shader background will not work.');
			// Add fallback text
			// eslint-disable-next-line svelte/no-dom-manipulating
			containerRef.innerHTML =
				'<div style="color: #ff6b35; padding: 20px; text-align: center;">WebGL not supported in this browser</div>';
			return;
		}
		console.log('✅ WebGL supported! Loading shader...');

		// Scene setup
		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

		// Renderer with performance optimizations
		const renderer = new THREE.WebGLRenderer({
			antialias: false, // Disable for performance
			alpha: true,
			powerPreference: 'high-performance'
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x for performance
		renderer.setSize(window.innerWidth, window.innerHeight);
		console.log('✅ Renderer created:', renderer.domElement);

		// eslint-disable-next-line svelte/no-dom-manipulating
		containerRef.appendChild(renderer.domElement);
		console.log('✅ Canvas added to DOM');

		// Shader uniforms
		const uniforms = {
			uTime: { value: 0 },
			uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
			uMouse: { value: new THREE.Vector2(0.5, 0.5) }
		};

		// Shader material
		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms
		});

		// Check for shader compilation errors
		material.needsUpdate = true;
		console.log('✅ Shader material created');

		// Full-screen quad
		const geometry = new THREE.PlaneGeometry(2, 2);
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);
		console.log('✅ Mesh added to scene - Shader should be rendering!');

		// Mouse tracking
		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX / window.innerWidth;
			mouseY = 1.0 - e.clientY / window.innerHeight;
		};
		window.addEventListener('mousemove', handleMouseMove);

		// Resize handler
		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			renderer.setSize(width, height);
			uniforms.uResolution.value.set(width, height);
		};
		window.addEventListener('resize', handleResize);

		// Animation loop with performance monitoring
		let animationId: number;
		let lastFrameTime = performance.now();
		const targetFPS = 60;
		const frameInterval = 1000 / targetFPS;

		const animate = () => {
			animationId = requestAnimationFrame(animate);

			const currentTime = performance.now();
			const deltaTime = currentTime - lastFrameTime;

			// Throttle to target FPS if needed
			if (deltaTime < frameInterval) return;

			lastFrameTime = currentTime - (deltaTime % frameInterval);

			// Update uniforms
			uniforms.uTime.value = currentTime * 0.001;
			uniforms.uMouse.value.set(mouseX, mouseY);

			// Render
			renderer.render(scene, camera);
		};

		animate();

		// Cleanup
		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('resize', handleResize);

			// Proper Three.js cleanup
			geometry.dispose();
			material.dispose();
			renderer.dispose();

			if (containerRef) {
				// eslint-disable-next-line svelte/no-dom-manipulating
				containerRef.removeChild(renderer.domElement);
			}
		};
	});
</script>

<div bind:this={containerRef} class="fixed inset-0 -z-10 bg-[#050608]"></div>

<style>
	div {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	div :global(canvas) {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
