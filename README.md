# Data Engineer Personal Website

A modern, artsy personal website for a technically-focused data engineer, built with **Svelte 5**, **SvelteKit**, and **TailwindCSS**. Features a Tumblr-inspired, interior-design aesthetic with a dark textured background and vibrant orange-red accents.

## ✨ Features

- 🎨 **Tumblr-inspired design** with black textured background and orange-red accents
- 🚀 **Svelte 5 runes** for modern, reactive state management
- 🎵 **Spotify integration** to showcase coding playlists
- 📺 **YouTube player** for background music
- 💼 **Project showcase** with GitHub links
- 🎭 **GIF gallery** for personality
- 🛠️ **Tech stack display** organized by category
- ✨ **Smooth animations** and scroll effects
- 📱 **Fully responsive** design
- ♿ **Accessible** with proper ARIA labels and keyboard navigation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:

```sh
pnpm install
```

3. Set up environment variables (see Configuration section below)

### Development

Start the development server:

```sh
pnpm dev

# or open in browser automatically
pnpm dev -- --open
```

### Building

Create a production build:

```sh
pnpm build
```

Preview the production build:

```sh
pnpm preview
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory (use `.env.example` as template):

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
```

**Getting Spotify Credentials:**

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Copy the Client ID and Client Secret
4. Add them to your `.env` file

### Customizing Content

All content is easily customizable through configuration files:

#### 1. **Projects** (`src/lib/config/projects.ts`)

Update the `projects` array with your GitHub repositories:

- `name`: Project name
- `description`: Brief description
- `techStack`: Array of technologies used
- `githubUrl`: Link to your GitHub repo
- `featured`: (optional) Mark as featured project

#### 2. **GIFs** (`src/lib/config/gifs.ts`)

Update the `gifs` array with your favorite GIFs:

- `url`: Direct link to GIF
- `caption`: Hover caption
- `alt`: Accessibility description

#### 3. **Tech Stack** (`src/lib/config/stack.ts`)

Organize your technologies by category in the `techStack` array:

- `name`: Category name (e.g., "Data & Databases")
- `tools`: Array of tools with `name` and optional `icon` (emoji)

#### 4. **Spotify Playlists** (`src/routes/api/spotify/playlists/+server.ts`)

Update the `PLAYLIST_IDS` array with your Spotify playlist IDs:

```typescript
const PLAYLIST_IDS = ['your_playlist_id_1', 'your_playlist_id_2', 'your_playlist_id_3'];
```

Find playlist IDs in Spotify URLs: `https://open.spotify.com/playlist/[PLAYLIST_ID]`

#### 5. **YouTube Videos** (`src/routes/+page.svelte`)

Update the `musicVideos` array with your favorite YouTube videos:

```typescript
const musicVideos = [
	{ id: 'video_id_1', label: 'Lo-fi Hip Hop' },
	{ id: 'video_id_2', label: 'Chill Synthwave' },
	{ id: 'video_id_3', label: 'Ambient Focus' }
];
```

Find video IDs in YouTube URLs: `https://www.youtube.com/watch?v=[VIDEO_ID]`

#### 6. **About Me Section** (`src/routes/+page.svelte`)

Edit the About section content directly in the page component:

- Update the bio paragraphs
- Customize the skills list
- Modify the stats (years of experience, pipelines built, etc.)

#### 7. **Social Links** (`src/routes/+layout.svelte`)

Update footer social links with your profiles:

- GitHub
- LinkedIn
- Add more as needed

## 🎨 Styling & Theme

The site uses a custom Tailwind theme defined in `src/routes/layout.css`:

- **Background**: `#050608` (near-black)
- **Accent**: `#ff6b35` (orange-red)
- **Accent Soft**: `#ff8c5f` (lighter orange)
- **Muted**: `#a0a0a0` (gray text)
- **Muted Dark**: `#606060` (darker gray)

To customize colors, edit the CSS custom properties in `layout.css`.

## 📁 Project Structure

```
src/
├── lib/
│   ├── components/
│   │   └── YouTubePlayer.svelte    # Reusable YouTube embed
│   └── config/
│       ├── projects.ts              # Project data
│       ├── gifs.ts                  # GIF data
│       └── stack.ts                 # Tech stack data
├── routes/
│   ├── api/
│   │   └── spotify/
│   │       └── playlists/
│   │           └── +server.ts       # Spotify API endpoint
│   ├── +layout.svelte               # Global layout with nav/footer
│   ├── +page.svelte                 # Main page with all sections
│   └── layout.css                   # Global styles & theme
```

## 🧪 Testing

Run end-to-end tests with Playwright:

```sh
pnpm test:e2e
```

## 🔧 Tech Stack

- **Framework**: SvelteKit with Svelte 5
- **Styling**: TailwindCSS v4
- **Language**: TypeScript
- **Testing**: Playwright
- **Linting**: ESLint + Prettier
- **APIs**: Spotify Web API, YouTube Embed

## 📝 TODO Checklist

After cloning, customize these items:

- [ ] Add Spotify credentials to `.env`
- [ ] Update projects in `src/lib/config/projects.ts`
- [ ] Replace GIFs in `src/lib/config/gifs.ts`
- [ ] Customize tech stack in `src/lib/config/stack.ts`
- [ ] Add your Spotify playlist IDs
- [ ] Add your YouTube video IDs
- [ ] Update About Me content and stats
- [ ] Add your social media links in footer
- [ ] Replace placeholder text with your own
- [ ] Update meta tags and SEO information

## 📄 License

This project is open source and available for personal use.

## 🙏 Acknowledgments

Built with modern web technologies and inspired by Tumblr's artsy aesthetic and high-end interior design websites.
