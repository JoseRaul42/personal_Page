import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Spotify Playlists API Endpoint
 *
 * This endpoint fetches playlists from Spotify Web API
 *
 * TODO: Set up environment variables:
 * - SPOTIFY_CLIENT_ID: Your Spotify app client ID
 * - SPOTIFY_CLIENT_SECRET: Your Spotify app client secret
 *
 * To get credentials:
 * 1. Go to https://developer.spotify.com/dashboard
 * 2. Create a new app
 * 3. Copy Client ID and Client Secret
 * 4. Add them to your .env file
 *
 * TODO: Update PLAYLIST_IDS with your actual playlist IDs
 * You can find playlist IDs in Spotify URLs:
 * https://open.spotify.com/playlist/[PLAYLIST_ID]
 */

// TODO: Add these to your .env file
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '';
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '';

// TODO: Replace with your actual playlist IDs
const PLAYLIST_IDS = [
	'37i9dQZF1DXcBWIGoYBM5M', // Example: Today's Top Hits
	'37i9dQZF1DX0XUsuxWHRQd', // Example: RapCaviar
	'37i9dQZF1DX4dyzvuaRJ0n' // Example: Mint
];

interface SpotifyPlaylist {
	id: string;
	name: string;
	description: string;
	images: { url: string }[];
	external_urls: { spotify: string };
	tracks: { total: number };
}

/**
 * Get Spotify access token using Client Credentials flow
 */
async function getAccessToken(): Promise<string> {
	if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
		throw new Error('Spotify credentials not configured');
	}

	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)
		},
		body: 'grant_type=client_credentials'
	});

	if (!response.ok) {
		throw new Error('Failed to get Spotify access token');
	}

	const data = await response.json();
	return data.access_token;
}

/**
 * Fetch a single playlist from Spotify
 */
async function fetchPlaylist(playlistId: string, accessToken: string): Promise<SpotifyPlaylist> {
	const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch playlist ${playlistId}`);
	}

	return response.json();
}

export const GET: RequestHandler = async () => {
	try {
		// Get access token
		const accessToken = await getAccessToken();

		// Fetch all playlists in parallel
		const playlistPromises = PLAYLIST_IDS.map((id) => fetchPlaylist(id, accessToken));
		const playlists = await Promise.all(playlistPromises);

		// Transform to simpler format
		const simplifiedPlaylists = playlists.map((playlist) => ({
			id: playlist.id,
			name: playlist.name,
			description: playlist.description || '',
			imageUrl: playlist.images[0]?.url || '',
			spotifyUrl: playlist.external_urls.spotify,
			trackCount: playlist.tracks.total
		}));

		return json(simplifiedPlaylists);
	} catch (error) {
		console.error('Error fetching Spotify playlists:', error);

		// Return mock data if Spotify API fails (useful for development)
		return json([
			{
				id: 'mock-1',
				name: 'Coding Focus',
				description: 'Deep focus music for programming sessions',
				imageUrl: 'https://via.placeholder.com/300x300/ff6b35/ffffff?text=Coding+Focus',
				spotifyUrl: 'https://open.spotify.com/embed/playlist/1nKtByrMkHKxK3e38n33SH',
				trackCount: 50
			},
			{
				id: 'mock-2',
				name: 'Data Engineering Vibes',
				description: 'Chill beats for data pipeline debugging',
				imageUrl: 'https://via.placeholder.com/300x300/ff6b35/ffffff?text=DE+Vibes',
				spotifyUrl: 'https://open.spotify.com/playlist/example',
				trackCount: 42
			},
			{
				id: 'mock-3',
				name: 'Late Night Debugging',
				description: 'Lo-fi hip hop for those 2am bug fixes',
				imageUrl: 'https://via.placeholder.com/300x300/ff6b35/ffffff?text=Late+Night',
				spotifyUrl: 'https://open.spotify.com/playlist/example',
				trackCount: 38
			}
		]);
	}
};
