# Customization Guide

This guide provides detailed instructions on how to customize your Data Engineer personal website.

## Table of Contents

1. [Environment Setup](#environment-setup)
2. [Content Customization](#content-customization)
3. [Styling & Theme](#styling--theme)
4. [Adding New Sections](#adding-new-sections)
5. [API Integration](#api-integration)

---

## Environment Setup

### Required Environment Variables

Create a `.env` file in the project root:

```env
# Spotify API (Required for playlist section)
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

### Getting Spotify Credentials

1. Visit [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create an App"
4. Fill in app name and description
5. Copy the **Client ID** and **Client Secret**
6. Add them to your `.env` file

**Note:** The Spotify endpoint uses Client Credentials flow, which doesn't require user authentication. It can access public playlists.

---

## Content Customization

### 1. Projects (`src/lib/config/projects.ts`)

Update your GitHub projects:

```typescript
export const projects: Project[] = [
	{
		name: 'Your Project Name',
		description: 'Brief description of what this project does',
		techStack: ['Python', 'PostgreSQL', 'Docker'],
		githubUrl: 'https://github.com/yourusername/repo',
		featured: true // Optional: mark as featured
	}
	// Add more projects...
];
```

**Tips:**

- Keep descriptions under 150 characters for best display
- Use 3-5 tech stack items per project
- Mark your best 2-3 projects as `featured: true`

### 2. GIFs (`src/lib/config/gifs.ts`)

Add your favorite GIFs:

```typescript
export const gifs: GifItem[] = [
	{
		url: 'https://media.giphy.com/media/YOUR_GIF_ID/giphy.gif',
		caption: 'Your funny caption',
		alt: 'Descriptive alt text for accessibility'
	}
	// Add more GIFs...
];
```

**Where to find GIFs:**

- [Giphy](https://giphy.com) - Right-click GIF → Copy Link
- [Tenor](https://tenor.com) - Click Share → Copy GIF Link
- Host your own GIFs in `/static/gifs/` folder

**Tips:**

- Keep GIFs under 5MB for performance
- Use descriptive alt text for accessibility
- 6-9 GIFs work well for the grid layout

### 3. Tech Stack (`src/lib/config/stack.ts`)

Organize your technologies by category:

```typescript
export const techStack: StackCategory[] = [
	{
		name: 'Your Category Name',
		tools: [
			{ name: 'Tool Name', icon: '🔧' }, // Emoji is optional
			{ name: 'Another Tool' }
			// Add more tools...
		]
	}
	// Add more categories...
];
```

**Suggested Categories:**

- Data & Databases
- Backend & Languages
- Frontend
- Data Engineering
- Infrastructure & Tools
- Cloud Platforms

**Tips:**

- Use emojis for visual interest (optional)
- Group related technologies together
- 4-8 items per category works best

### 4. Spotify Playlists

#### Option A: Your Own Playlists

1. Open Spotify and navigate to your playlist
2. Click the three dots (•••) → Share → Copy link to playlist
3. Extract the playlist ID from the URL:
   ```
   https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M
                                    ^^^^^^^^^^^^^^^^^^^^^^^^
                                    This is the playlist ID
   ```
4. Add to `src/routes/api/spotify/playlists/+server.ts`:

```typescript
const PLAYLIST_IDS = ['37i9dQZF1DXcBWIGoYBM5M', 'your_playlist_id_2', 'your_playlist_id_3'];
```

#### Option B: Public Playlists

You can use any public Spotify playlist by getting its ID from the URL.

**Tips:**

- 3-6 playlists display well
- Choose playlists that represent your music taste
- Make sure playlists are public (not private)

### 5. YouTube Videos

Update the music videos in `src/routes/+page.svelte`:

```typescript
const musicVideos = [
	{ id: 'jfKfPfyJRdk', label: 'Lo-fi Hip Hop' },
	{ id: '5qap5aO4i9A', label: 'Chill Synthwave' },
	{ id: 'your_video_id', label: 'Your Label' }
];
```

**Finding Video IDs:**

1. Go to YouTube video
2. Copy the URL: `https://www.youtube.com/watch?v=jfKfPfyJRdk`
3. The video ID is after `v=`: `jfKfPfyJRdk`

**Tips:**

- Choose longer videos (1+ hours) for background music
- Lo-fi, ambient, and instrumental music work well
- Test videos to ensure they allow embedding

### 6. About Me Section

Edit directly in `src/routes/+page.svelte` (search for `id="about"`):

```svelte
<p class="text-lg leading-relaxed text-[#a0a0a0]">
	Your bio paragraph here. Talk about your experience, passion, and what drives you as a data
	engineer.
</p>
```

**Update the stats:**

```svelte
<div class="mb-2 text-4xl font-bold text-[#ff6b35]">5+</div>
<div class="text-[#a0a0a0]">Years of Experience</div>
```

**Update skills:**

```svelte
{#each ['Data Engineering', 'Your Skill', 'Another Skill'] as skill}
	<span class="...">
		{skill}
	</span>
{/each}
```

### 7. Social Links

Update footer links in `src/routes/+layout.svelte`:

```svelte
<a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" class="...">
	<!-- GitHub icon -->
</a>
```

**Adding More Social Links:**

Copy an existing link and update:

- `href`: Your profile URL
- `aria-label`: Platform name
- SVG icon: Find icons at [Simple Icons](https://simpleicons.org/)

---

## Styling & Theme

### Color Scheme

Colors are defined in `src/routes/layout.css`:

```css
@theme {
	--color-bg-dark: #050608; /* Main background */
	--color-accent: #ff6b35; /* Primary accent (orange-red) */
	--color-accent-soft: #ff8c5f; /* Lighter accent */
	--color-muted: #a0a0a0; /* Body text */
	--color-muted-dark: #606060; /* Secondary text */
}
```

**To change the color scheme:**

1. Choose your colors (use a tool like [Coolors](https://coolors.co/))
2. Update the CSS custom properties
3. Test contrast for accessibility

**Using colors in components:**

```svelte
<div class="bg-[#050608] text-[#ff6b35]">
	<!-- Your content -->
</div>
```

### Typography

The site uses system fonts by default. To change:

```css
body {
	font-family:
		'Your Font',
		-apple-system,
		BlinkMacSystemFont,
		sans-serif;
}
```

**Adding custom fonts:**

1. Add font link to `src/app.html`:

```html
<link
	href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
	rel="stylesheet"
/>
```

2. Update font-family in `layout.css`

### Background Texture

The textured background is created with CSS in `layout.css`:

```css
body::before {
	background-image:
		radial-gradient(...),
		/* Accent glows */ url('data:image/svg+xml,...'); /* Noise texture */
}
```

**To adjust:**

- Change `opacity` to make texture more/less visible
- Modify radial-gradient positions for accent placement
- Remove texture entirely by commenting out this block

### Animations

Scroll animations are controlled by the `.animate-on-scroll` class:

```css
.animate-on-scroll {
	opacity: 0;
	transform: translateY(30px);
	transition:
		opacity 0.6s ease-out,
		transform 0.6s ease-out;
}

.animate-on-scroll.is-visible {
	opacity: 1;
	transform: translateY(0);
}
```

**To disable animations:**
Remove the `animate-on-scroll` class from section elements.

---

## Adding New Sections

### Step 1: Add Section to Page

In `src/routes/+page.svelte`, add a new section:

```svelte
<section id="your-section" class="animate-on-scroll py-20">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-12 text-center text-4xl font-bold text-[#ff6b35] sm:text-5xl">
				Your Section Title
			</h2>

			<!-- Your content here -->
		</div>
	</div>
</section>
```

### Step 2: Add to Navigation

In `src/routes/+layout.svelte`, add to `navItems`:

```typescript
const navItems = [
	// ... existing items
	{ id: 'your-section', label: 'Your Label' }
];
```

### Step 3: Style Consistently

Use the established design patterns:

- `bg-[#050608]` for card backgrounds
- `border-[#ff6b35]/10` for subtle borders
- `hover:border-[#ff6b35]/50` for hover states
- `text-[#ff6b35]` for accent text
- `text-[#a0a0a0]` for body text

---

## API Integration

### Spotify API

The Spotify endpoint is in `src/routes/api/spotify/playlists/+server.ts`.

**Key functions:**

- `getAccessToken()`: Authenticates with Spotify
- `fetchPlaylist()`: Fetches a single playlist
- `GET handler`: Returns simplified playlist data

**Error Handling:**
The endpoint returns mock data if the API fails, useful for development without credentials.

**Rate Limiting:**
Spotify has rate limits. For production, consider:

- Caching responses
- Using SvelteKit's load function with cache headers

### Adding Other APIs

To add a new API endpoint:

1. Create `src/routes/api/your-endpoint/+server.ts`:

```typescript
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const response = await fetch('https://api.example.com/data');
		const data = await response.json();
		return json(data);
	} catch (error) {
		return json({ error: 'Failed to fetch' }, { status: 500 });
	}
};
```

2. Fetch from your component:

```typescript
let data = $state([]);

onMount(async () => {
	const response = await fetch('/api/your-endpoint');
	data = await response.json();
});
```

---

## Tips & Best Practices

### Performance

1. **Optimize images**: Use WebP format, compress GIFs
2. **Lazy loading**: Images use `loading="lazy"` by default
3. **Code splitting**: SvelteKit handles this automatically

### Accessibility

1. **Alt text**: Always provide for images and GIFs
2. **ARIA labels**: Used for icon buttons and navigation
3. **Keyboard navigation**: All interactive elements are keyboard accessible
4. **Focus states**: Visible focus indicators on all interactive elements

### SEO

Update meta tags in `src/routes/+page.svelte`:

```svelte
<svelte:head>
	<title>Your Name | Data Engineer</title>
	<meta name="description" content="Your custom description" />
	<meta property="og:title" content="Your Name" />
	<meta property="og:description" content="Your description" />
	<meta property="og:image" content="/og-image.jpg" />
</svelte:head>
```

### Development Workflow

1. **Run dev server**: `pnpm dev`
2. **Check linting**: `pnpm lint`
3. **Format code**: `pnpm format`
4. **Run tests**: `pnpm test:e2e`
5. **Build**: `pnpm build`
6. **Preview**: `pnpm preview`

---

## Troubleshooting

### Spotify Playlists Not Loading

1. Check `.env` file has correct credentials
2. Verify playlists are public
3. Check browser console for errors
4. Test API endpoint directly: `http://localhost:5173/api/spotify/playlists`

### YouTube Videos Not Embedding

1. Verify video allows embedding (check YouTube settings)
2. Use correct video ID format
3. Check for CORS issues in browser console

### Animations Not Working

1. Ensure JavaScript is enabled
2. Check browser console for errors
3. Verify IntersectionObserver is supported (modern browsers)

### Styling Issues

1. Run `pnpm dev` to ensure Tailwind is compiling
2. Check for typos in class names
3. Clear browser cache
4. Verify Tailwind config is correct

---

## Need Help?

- Check the [main README](./README.md)
- Review [Svelte 5 documentation](https://svelte.dev/docs)
- Review [SvelteKit documentation](https://kit.svelte.dev/docs)
- Check [TailwindCSS documentation](https://tailwindcss.com/docs)

Happy customizing! 🚀
