# Advanced Animated Background Component

## Overview

The `AnimatedBackground.svelte` component creates an **ultra-textured, dark, animated background** using advanced Svelte 5 techniques and Canvas API.

## Features

### 🎨 Visual Effects

1. **Multi-Layer Canvas System**
   - Base dark gradient layer
   - Animated noise texture canvas
   - Particle system canvas with physics
   - Static SVG noise overlay
   - Vignette effect for depth

2. **Animated Particles (150 particles)**
   - Floating particles with realistic physics
   - Mouse interaction - particles move away from cursor
   - Connecting lines between nearby particles
   - Pulsing opacity for organic feel
   - Orange-red color palette with glow effects

3. **Dynamic Gradient Mesh**
   - Multiple radial gradients that move over time
   - Smooth sine/cosine-based motion
   - Subtle orange accent colors

4. **Procedural Noise**
   - Real-time canvas-based noise generation
   - Perlin-like noise using sine wave combinations
   - Updates every few frames for performance

### ⚡ Advanced Techniques Used

#### Svelte 5 Runes

```typescript
let canvasRef = $state<HTMLCanvasElement | null>(null);
let mouseX = $state(0);
let mouseY = $state(0);
```

#### Svelte Motion (Spring Physics)

```typescript
const mouse = spring({ x: 0, y: 0 }, { stiffness: 0.05, damping: 0.25 });
```

#### Object-Oriented Particle System

```typescript
class Particle {
  // Physics-based particle with mouse interaction
  update(width, height, mouseInfluence) { ... }
  draw(ctx) { ... }
}
```

#### Canvas Performance Optimization

- Noise only updates every few frames
- Particle count scales with screen size
- RequestAnimationFrame for smooth 60fps
- Proper canvas cleanup on unmount

## Customization

### Adjust Particle Count

```typescript
// In onMount
const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000));
// Increase denominator (15000) for fewer particles
// Decrease for more particles
```

### Change Colors

```typescript
// In Particle class constructor
this.hue = Math.random() * 20 + 10; // Orange-red hues (10-30)
// Change to 200-220 for blue tones
// Change to 120-140 for green tones
```

### Adjust Particle Speed

```typescript
// In Particle class constructor
this.speedX = Math.random() * 0.5 - 0.25; // Current: ±0.25
// Increase multiplier for faster movement
```

### Modify Mouse Interaction

```typescript
// In particle update method
const maxDistance = 200; // Pixels from cursor
const force = (maxDistance - distance) / maxDistance;
this.x += (dx / distance) * force * 2; // Multiply by larger number for stronger push
```

### Change Animation Speed

```typescript
// In generateNoise function
const noise =
	Math.sin(x * 0.05 + time * 0.0005) * // Increase time multiplier for faster animation
	Math.cos(y * 0.05 + time * 0.0003);
```

### Adjust Opacity/Intensity

```typescript
// In component template
<canvas bind:this={canvasRef} class="absolute inset-0 opacity-100" />
// Change opacity-100 to opacity-80, opacity-60, etc.
```

## Performance Tips

1. **Reduce Particles on Mobile**
   - The system automatically scales based on screen size
   - Further reduce for low-end devices

2. **Disable Features**
   - Comment out `generateNoise()` for better performance
   - Remove particle connections (lines between particles)
   - Reduce gradient count in `drawGradientMesh()`

3. **Throttle Updates**
   ```typescript
   // Update noise less frequently
   if (Math.floor(time / 200) % 2 === 0) { // Was 100
     generateNoise(...);
   }
   ```

## Browser Compatibility

- ✅ Chrome/Edge (best performance)
- ✅ Firefox
- ✅ Safari
- ⚠️ Mobile browsers (may have reduced performance)

## Technical Details

### Canvas Layers (from back to front)

1. **Base gradient** - Static CSS gradient
2. **Noise canvas** - Animated procedural texture
3. **Particles canvas** - Interactive particle system
4. **Static SVG overlay** - Additional texture detail
5. **Vignette** - Darkens edges

### Blend Modes

- Canvases use `screen` blend mode for additive light
- SVG overlay uses `overlay` for texture depth

### Memory Management

- Proper cleanup in `onMount` return function
- Event listeners removed on unmount
- Animation frames cancelled
- Canvas contexts released

## Integration

Already integrated in `src/routes/+layout.svelte`:

```svelte
<script>
	import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
</script>

<AnimatedBackground />
```

The component is positioned with `fixed inset-0 -z-10` so it stays behind all content.

## Troubleshooting

### Background appears white

- Check that `body` in `layout.css` has `background-color: #050608`
- Ensure component is imported in layout
- Clear browser cache

### Performance issues

- Reduce particle count
- Disable noise generation
- Remove particle connections
- Lower canvas resolution

### Particles not interactive

- Check mouse event listeners are attached
- Verify spring motion is imported correctly
- Check console for errors

## Future Enhancements

Potential additions:

- WebGL for even better performance
- More particle shapes (stars, hexagons)
- Sound reactivity (using Web Audio API)
- Parallax scroll effect based on page position
- Color themes (cycle through different palettes)
- Performance mode toggle for low-end devices
