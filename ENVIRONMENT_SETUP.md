# Environment Setup Guide

This guide walks you through setting up the required environment variables for your Data Engineer personal website.

## Required Environment Variables

Create a `.env` file in the root of your project with the following variables:

```env
# Spotify API Configuration
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
```

## Getting Spotify API Credentials

The Spotify integration allows you to display your favorite coding playlists on your website.

### Step-by-Step Instructions

1. **Go to Spotify Developer Dashboard**
   - Visit: https://developer.spotify.com/dashboard
   - Log in with your Spotify account (create one if needed)

2. **Create a New App**
   - Click the "Create app" button
   - Fill in the required fields:
     - **App name**: "Personal Website" (or any name you prefer)
     - **App description**: "Display playlists on my personal website"
     - **Redirect URI**: `http://localhost:5173` (not used, but required)
     - **Which API/SDKs are you planning to use?**: Select "Web API"
   - Accept the Terms of Service
   - Click "Save"

3. **Get Your Credentials**
   - On your app's dashboard, you'll see:
     - **Client ID**: A long string of letters and numbers
     - **Client Secret**: Click "View client secret" to reveal it
   - Copy both values

4. **Create Your .env File**
   - In the root of your project, create a file named `.env`
   - Add your credentials:

   ```env
   SPOTIFY_CLIENT_ID=paste_your_client_id_here
   SPOTIFY_CLIENT_SECRET=paste_your_client_secret_here
   ```

   - Save the file

5. **Verify Setup**
   - Restart your development server: `pnpm dev`
   - Navigate to the Playlists section
   - Your playlists should load (or mock data if you haven't configured playlist IDs yet)

## Security Notes

⚠️ **Important Security Information:**

- **Never commit your `.env` file** to version control
  - The `.gitignore` file already excludes `.env` files
  - Double-check before pushing to GitHub

- **Keep your Client Secret private**
  - Don't share it in public repositories
  - Don't include it in screenshots or documentation

- **Regenerate if compromised**
  - If you accidentally expose your credentials, regenerate them in the Spotify Dashboard
  - Go to your app → Settings → "Reset client secret"

## Troubleshooting

### Playlists Not Loading

If your playlists aren't loading:

1. **Check your .env file**
   - Ensure it's named exactly `.env` (not `.env.txt`)
   - Verify there are no extra spaces around the `=` sign
   - Make sure the file is in the project root (same level as `package.json`)

2. **Verify credentials**
   - Copy credentials again from Spotify Dashboard
   - Ensure you copied the entire Client ID and Secret

3. **Restart the dev server**
   - Stop the server (Ctrl+C)
   - Run `pnpm dev` again

4. **Check the browser console**
   - Open Developer Tools (F12)
   - Look for error messages in the Console tab
   - Check the Network tab for failed API requests

5. **Test the API endpoint directly**
   - Visit: `http://localhost:5173/api/spotify/playlists`
   - You should see JSON data or an error message

### Mock Data Appearing

If you see placeholder playlists with "Coding Focus", "Data Engineering Vibes", etc.:

- This means the Spotify API is not configured or failing
- The app falls back to mock data for development
- Follow the setup steps above to enable real playlists

## Optional: Development Without Spotify

If you want to develop without setting up Spotify:

1. The site will work with mock playlist data
2. You can customize the mock data in:
   ```
   src/routes/api/spotify/playlists/+server.ts
   ```
3. Look for the `catch` block that returns mock data
4. Modify the mock playlists as needed

## Next Steps

After setting up your environment:

1. ✅ Configure your playlist IDs (see [CUSTOMIZATION.md](./CUSTOMIZATION.md))
2. ✅ Customize other content (projects, GIFs, tech stack)
3. ✅ Update your About Me section
4. ✅ Add your social media links

## Need More Help?

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Main README](./README.md)
- [Customization Guide](./CUSTOMIZATION.md)
