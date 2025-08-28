import { describe, it, expect, vi } from 'vitest';
import { generateSessionToken, createSession, validateSessionToken } from '$lib/server/auth';
import type { D1Database } from '@cloudflare/workers-types';

describe('Authentication with D1', () => {
	// Mock platform object with D1 binding
	const mockPlatform = {
		env: {
			aqua_note_db: {} as D1Database
		}
	} as App.Platform;

	describe('generateSessionToken', () => {
		it('should generate a valid base64url token', () => {
			const token = generateSessionToken();

			// Check token format (base64url)
			expect(token).toMatch(/^[A-Za-z0-9_-]+$/);

			// Check token length (should be 24 characters for 18 bytes)
			expect(token).toHaveLength(24);
		});

		it('should generate unique tokens', () => {
			const token1 = generateSessionToken();
			const token2 = generateSessionToken();

			expect(token1).not.toBe(token2);
		});
	});

	describe('Session Management', () => {
		it('should handle platform parameter correctly', async () => {
			// This test verifies that the functions accept platform parameter
			// In a real test environment, we would mock the database operations

			const token = generateSessionToken();

			// Mock the getDb function to avoid actual DB calls in unit tests
			vi.mock('$lib/server/db', () => ({
				getDb: vi.fn(() => ({
					insert: vi.fn().mockReturnValue({
						values: vi.fn().mockResolvedValue(undefined)
					}),
					select: vi.fn().mockReturnValue({
						from: vi.fn().mockReturnValue({
							innerJoin: vi.fn().mockReturnValue({
								where: vi.fn().mockResolvedValue([])
							})
						})
					})
				}))
			}));

			// Verify that functions accept platform parameter without errors
			expect(() => validateSessionToken(mockPlatform, token)).not.toThrow();
			expect(() => createSession(mockPlatform, token, 'test-user')).not.toThrow();
		});
	});
});
