/**
 * Configuration for favorite GIFs
 *
 * TODO: Replace these placeholder GIF URLs with your favorite GIFs
 * - Use services like Giphy, Tenor, or host your own
 * - Update captions to match your personality
 * - Ensure GIFs are appropriately sized for web (< 5MB recommended)
 */

export interface GifItem {
	url: string;
	caption: string;
	alt: string;
}

export const gifs: GifItem[] = [
	{
		url: 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif',
		caption: 'Monday debugging energy',
		alt: 'Person debugging code intensely'
	},
	{
		url: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',
		caption: 'When the query finally works',
		alt: 'Celebration dance'
	},
	{
		url: 'https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif',
		caption: 'Data pipeline running smoothly',
		alt: 'Smooth operation visualization'
	},
	{
		url: 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
		caption: 'Optimizing that slow query',
		alt: 'Working hard at computer'
	},
	{
		url: 'https://media.giphy.com/media/3o7TKTDn976rzVgky4/giphy.gif',
		caption: 'Coffee-fueled coding sessions',
		alt: 'Drinking coffee while coding'
	},
	{
		url: 'https://media.giphy.com/media/ZVik7pBtu9dNS/giphy.gif',
		caption: 'Deploying to production',
		alt: 'Nervous excitement'
	}
];
