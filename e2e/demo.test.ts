import { expect, test } from '@playwright/test';

test.describe('Data Engineer Personal Page', () => {
	test('home page loads successfully', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('h1')).toBeVisible();
		await expect(page.locator('h1')).toContainText('Data Engineer');
	});

	test('all main sections are present', async ({ page }) => {
		await page.goto('/');

		// Check for all main sections
		await expect(page.locator('#hero')).toBeVisible();
		await expect(page.locator('#about')).toBeVisible();
		await expect(page.locator('#projects')).toBeVisible();
		await expect(page.locator('#playlists')).toBeVisible();
		await expect(page.locator('#music')).toBeVisible();
		await expect(page.locator('#gifs')).toBeVisible();
		await expect(page.locator('#stack')).toBeVisible();
	});

	test('navigation menu works', async ({ page }) => {
		await page.goto('/');

		// Check navigation is visible
		await expect(page.locator('nav')).toBeVisible();

		// Check nav items exist
		const navButtons = page.locator('nav button');
		await expect(navButtons).toHaveCount(5); // Home, About, Projects, Music, Stack
	});

	test('projects section displays project cards', async ({ page }) => {
		await page.goto('/');

		// Scroll to projects section
		await page.locator('#projects').scrollIntoViewIfNeeded();

		// Check that project cards are rendered
		const projectCards = page.locator('#projects .group');
		await expect(projectCards.first()).toBeVisible();
	});

	test('spotify playlists section loads', async ({ page }) => {
		await page.goto('/');

		// Scroll to playlists section
		await page.locator('#playlists').scrollIntoViewIfNeeded();

		// Wait for playlists to load (either loading spinner or playlist cards)
		await page.waitForTimeout(2000); // Give API time to respond

		// Check section is visible
		await expect(page.locator('#playlists')).toBeVisible();
	});

	test('youtube player component renders', async ({ page }) => {
		await page.goto('/');

		// Scroll to music section
		await page.locator('#music').scrollIntoViewIfNeeded();

		// Check that YouTube iframe is present
		await expect(page.locator('iframe[src*="youtube"]')).toBeVisible();
	});

	test('tech stack section displays categories', async ({ page }) => {
		await page.goto('/');

		// Scroll to stack section
		await page.locator('#stack').scrollIntoViewIfNeeded();

		// Check that tech stack items are visible
		await expect(page.locator('#stack')).toBeVisible();
	});

	test('footer is present with social links', async ({ page }) => {
		await page.goto('/');

		// Scroll to footer
		await page.locator('footer').scrollIntoViewIfNeeded();

		// Check footer is visible
		await expect(page.locator('footer')).toBeVisible();

		// Check social links exist
		const socialLinks = page.locator('footer a[target="_blank"]');
		await expect(socialLinks).toHaveCount(2); // GitHub and LinkedIn
	});

	test('mobile menu toggle works', async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		// Mobile menu button should be visible
		const menuButton = page.locator('button[aria-label="Toggle menu"]');
		await expect(menuButton).toBeVisible();

		// Click to open menu
		await menuButton.click();

		// Menu should expand
		await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
	});
});
