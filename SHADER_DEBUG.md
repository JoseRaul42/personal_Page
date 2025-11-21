# Shader Background Debugging Guide 🔍

## Quick Checks

### 1. **Check the Browser Console** (MOST IMPORTANT!)

1. **Open Developer Tools**:
   - **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I`
   - **Firefox**: Press `F12` or `Ctrl+Shift+K`
   - **Safari**: Press `Cmd+Option+I`

2. **Look for these messages in Console**:

   ```
   ✅ WebGL supported! Loading shader...
   ✅ Renderer created: <canvas>
   ✅ Canvas added to DOM
   ✅ Shader material created
   ✅ Mesh added to scene - Shader should be rendering!
   ```

3. **If you see errors**:
   - Look for red errors about WebGL, shaders, or Three.js
   - Copy the error and check below

### 2. **Enable Test Mode** (Bright Visual Test)

If you don't see anything, let's test with a BRIGHT visual:

1. Open `src/lib/components/ShaderBackground.svelte`
2. Find line ~14 and change:

   ```typescript
   const TEST_MODE = false;
   ```

   to:

   ```typescript
   const TEST_MODE = true;
   ```

3. Save and refresh your browser

**You should now see**:

- Bright orange animated gradient
- Orange circle following your mouse
- Orange circle moving around the screen

If you see this, WebGL is working! The fractal shader just needs adjustment.

### 3. **Restart Dev Server**

Sometimes the dev server needs a restart:

```bash
# Stop the server (Ctrl+C)
# Then restart:
pnpm dev
```

### 4. **Clear Browser Cache**

1. **Chrome/Edge**: Press `Ctrl+Shift+Delete` → Clear cached images
2. **Firefox**: Press `Ctrl+Shift+Delete` → Clear cache
3. Or just do a **Hard Refresh**:
   - **Windows**: `Ctrl+F5` or `Ctrl+Shift+R`
   - **Mac**: `Cmd+Shift+R`

---

## Common Issues

### ❌ Issue: "WebGL not supported"

**Cause**: Your browser or GPU doesn't support WebGL

**Fix**:

1. Update your browser to the latest version
2. Check GPU status: Visit `chrome://gpu` (Chrome) or `about:support` (Firefox)
3. Enable hardware acceleration:
   - Chrome: Settings → Advanced → System → "Use hardware acceleration"
   - Firefox: Options → Performance → Uncheck "Use recommended performance settings"

**Fallback**: Switch to the simpler particle background:

```svelte
<!-- In src/routes/+layout.svelte -->
import AnimatedBackground from '$lib/components/AnimatedBackground.svelte'; // ...
<AnimatedBackground />
```

### ❌ Issue: Black screen / Nothing visible

**Possible causes**:

1. **Shader too dark** - Already fixed! Should be much brighter now
2. **Canvas not rendered** - Check console logs
3. **Z-index issue** - Canvas is behind other elements

**Debug**:

```typescript
// Add to onMount in ShaderBackground.svelte
console.log('Canvas dimensions:', renderer.domElement.width, renderer.domElement.height);
console.log('Container:', containerRef);
```

### ❌ Issue: Performance problems / Lag

**Fix**: Reduce quality

In `src/lib/components/ShaderBackground.svelte`:

```typescript
// Line ~250
renderer.setPixelRatio(1); // Lower from 2

// OR in the shader, reduce steps:
// Line ~122 in fragmentShader
for(int i = 0; i < 60; i++) { // Lower from 80
```

### ❌ Issue: Shader compiles but looks wrong

**Check shader errors**:

```typescript
// Add after material creation:
renderer.info.programs.forEach((program) => {
	console.log('Program:', program);
});
```

---

## What You SHOULD See

### With TEST_MODE = true:

- **Bright orange animated gradient** across the screen
- **Orange circle following your mouse** cursor
- **Orange circle bouncing** around the screen
- Everything should be **very visible and obvious**

### With TEST_MODE = false (production shader):

- **Dark background** with subtle texture
- **Organic 3D fractal structures** in orange/red tones
- **Rotating, twisting shapes** that move slowly
- **Brighter areas** where the fractal surfaces face the lights
- **Subtle glow** around edges (Fresnel effect)
- **Camera moves** when you move your mouse

---

## Step-by-Step Visual Test

### Step 1: Enable TEST_MODE

```typescript
const TEST_MODE = true;
```

Save, refresh. **Do you see bright orange?**

- ✅ **YES**: WebGL works! Continue to Step 2
- ❌ **NO**: Check console for errors, verify WebGL support

### Step 2: Check Mouse Interaction

Move your mouse around.

- ✅ **Orange circle follows mouse**: Everything works!
- ❌ **No interaction**: Check console, mouse events might be blocked

### Step 3: Try Production Shader

```typescript
const TEST_MODE = false;
```

Save, refresh. Wait 2-3 seconds for shader to compile.

- ✅ **See dark background with orange fractals**: SUCCESS!
- ❌ **Just black**: Shader might be too dark or not compiling

---

## Brightness Adjustments

If the shader is too dark, increase these values in `fragmentShader`:

```glsl
// Line ~170 - Make base brighter
vec3 baseColor = vec3(0.6, 0.3, 0.2); // Increase these values

// Line ~178 - Increase lighting
col += accentColor * diff1 * 3.0; // Increase multiplier
```

---

## Browser Compatibility Check

| Browser           | Expected Result                  |
| ----------------- | -------------------------------- |
| **Chrome 90+**    | ✅ Perfect                       |
| **Edge 90+**      | ✅ Perfect                       |
| **Firefox 85+**   | ✅ Very good                     |
| **Safari 14+**    | ✅ Good (may be slower)          |
| **Mobile Chrome** | ⚠️ May be slow, enable TEST_MODE |
| **Mobile Safari** | ⚠️ May have issues               |
| **IE 11**         | ❌ Not supported                 |

---

## Performance Monitoring

Check frame rate in console:

```typescript
// Add to animate() function in ShaderBackground.svelte
let frameCount = 0;
let lastFPSTime = performance.now();

// In animate loop:
frameCount++;
if (currentTime - lastFPSTime > 1000) {
	console.log('FPS:', frameCount);
	frameCount = 0;
	lastFPSTime = currentTime;
}
```

**Target**: 60 FPS  
**Acceptable**: 30+ FPS  
**Too slow**: < 30 FPS (reduce quality)

---

## Quick Fixes

### Make it MUCH brighter:

```glsl
// Line ~178 in fragmentShader
col = baseColor * 3.0; // Was 1.5
col += accentColor * diff1 * 5.0; // Was 2.0
```

### Make it move faster:

```glsl
// Line ~56
q.xy *= rot(uTime * 0.3); // Was 0.1
```

### Zoom in closer:

```glsl
// Line ~138
vec3 ro = vec3(0.0, 0.0, 2.0); // Was 3.0
```

---

## Still Not Working?

1. **Post console errors** - All red text in console
2. **Check `chrome://gpu`** - GPU feature status
3. **Try Firefox** - Sometimes better WebGL support
4. **Use AnimatedBackground** - Simpler fallback that always works

---

## Success Checklist

- [ ] Console shows "✅ WebGL supported!"
- [ ] Console shows "✅ Mesh added to scene"
- [ ] TEST_MODE shows bright orange
- [ ] Production mode shows dark fractals
- [ ] Mouse movement changes camera
- [ ] No console errors
- [ ] Smooth 60 FPS

If all checked: **SHADER IS WORKING! 🎉**

---

## Contact

If still having issues, share:

1. Browser version
2. Console errors (screenshots)
3. Result of TEST_MODE
4. GPU status from `chrome://gpu`
