# Quick Start Guide

Get your Data Engineer personal website up and running in 5 minutes!

## 🚀 Immediate Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Development Server

```bash
pnpm dev
```

Visit: http://localhost:5173

**That's it!** Your site is now running with mock data.

---

## 🎨 Essential Customizations (10 minutes)

### Step 1: Update Your Info

**File:** `src/routes/+page.svelte`

Find and replace:

- "Jose Valois" → Your Name
- "Technically-focused Data Engineer..." → Your Tagline
- Bio paragraphs in About section

### Step 2: Add Your Projects

**File:** `src/lib/config/projects.ts`

Replace the example projects with your own:

```typescript
{
  name: 'Your Project Name',
  description: 'What it does',
  techStack: ['Python', 'SQL', 'Docker'],
  githubUrl: 'https://github.com/yourusername/repo'
}
```

### Step 3: Customize Tech Stack

**File:** `src/lib/config/stack.ts`

Update the tools you actually use:

```typescript
{
  name: 'Data & Databases',
  tools: [
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'MongoDB', icon: '🍃' },
    // Add your tools...
  ]
}
```

### Step 4: Add Social Links

**File:** `src/routes/+layout.svelte`

Find the footer section and update:

```svelte
<a href="https://github.com/yourusername" ...>
<a href="https://linkedin.com/in/yourprofile" ...>
```

---

## 🎵 Optional: Spotify Integration (5 minutes)

### Get Credentials

1. Go to: https://developer.spotify.com/dashboard
2. Click "Create app"
3. Copy Client ID and Client Secret

### Add to Project

Create `.env` file in project root:

```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

### Add Your Playlists

**File:** `src/routes/api/spotify/playlists/+server.ts`

Find `PLAYLIST_IDS` and add your playlist IDs:

```typescript
const PLAYLIST_IDS = ['your_playlist_id_1', 'your_playlist_id_2', 'your_playlist_id_3'];
```

**How to get playlist IDs:**

1. Open playlist in Spotify
2. Click Share → Copy link
3. Extract ID from URL: `https://open.spotify.com/playlist/[THIS_IS_THE_ID]`

**Restart server after adding .env:**

```bash
# Stop server (Ctrl+C), then:
pnpm dev
```

---

## 📺 Optional: YouTube Videos (2 minutes)

**File:** `src/routes/+page.svelte`

Find `musicVideos` array and update:

```typescript
const musicVideos = [
	{ id: 'jfKfPfyJRdk', label: 'Lo-fi Hip Hop' },
	{ id: 'your_video_id', label: 'Your Label' }
];
```

**Get video IDs from YouTube URLs:**
`https://www.youtube.com/watch?v=[VIDEO_ID]`

---

## 🎭 Optional: GIFs (2 minutes)

**File:** `src/lib/config/gifs.ts`

Replace with your favorite GIFs:

```typescript
{
  url: 'https://media.giphy.com/media/YOUR_GIF_ID/giphy.gif',
  caption: 'Your caption',
  alt: 'Description for accessibility'
}
```

**Find GIFs:**

- Giphy.com → Right-click GIF → Copy Link
- Tenor.com → Share → Copy GIF Link

---

## ✅ Verification Checklist

After customization, verify:

- [ ] Site loads at http://localhost:5173
- [ ] Your name appears in hero section
- [ ] Projects show your repositories
- [ ] Tech stack reflects your tools
- [ ] Social links go to your profiles
- [ ] (Optional) Spotify playlists load
- [ ] (Optional) YouTube player works
- [ ] Mobile menu works (resize browser)

---

## 🏗️ Build for Production

When ready to deploy:

```bash
# Build the site
pnpm run build

# Preview production build locally
pnpm run preview
```

---

## 📱 Test on Mobile

1. Find your local IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`

2. Visit on phone: `http://YOUR_IP:5173`

3. Test:
   - Mobile menu
   - Scroll animations
   - Touch interactions

---

## 🚢 Deploy

### Quick Deploy Options

**Vercel (Recommended):**

1. Push to GitHub
2. Import on vercel.com
3. Add environment variables (if using Spotify)
4. Deploy!

**Netlify:**

1. Push to GitHub
2. Import on netlify.com
3. Add environment variables
4. Deploy!

**GitHub Pages:**

1. Install static adapter: `pnpm add -D @sveltejs/adapter-static`
2. Update `svelte.config.js`
3. Build and deploy to gh-pages branch

---

## 🆘 Troubleshooting

### Site won't start

```bash
# Clear cache and reinstall
rm -rf node_modules .svelte-kit
pnpm install
pnpm dev
```

### Spotify not working

- Check `.env` file exists in root
- Verify credentials are correct
- Restart dev server
- Check browser console for errors

### Styles look broken

- Ensure TailwindCSS is installed
- Check `layout.css` is imported
- Clear browser cache

### Build fails

```bash
# Run type check
pnpm run check

# Run linter
pnpm run lint
```

---

## 📚 Need More Help?

- **Detailed Customization**: See [CUSTOMIZATION.md](./CUSTOMIZATION.md)
- **Environment Setup**: See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
- **Full Documentation**: See [README.md](./README.md)
- **Implementation Details**: See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

---

## 🎉 You're Ready!

Your personal website is now set up and customized. Time to:

1. ✅ Test everything works
2. ✅ Build for production
3. ✅ Deploy to the web
4. ✅ Share with the world!

**Happy coding!** 🚀
