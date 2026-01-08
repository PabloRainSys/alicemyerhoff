// Client-side WordPress utilities (no environment variables)
import type { YoastSEOData } from '$lib/types';

// Utility functions
export const wpUtils = {
	// Decode HTML entities
	decodeHtmlEntities(text: string): string {
		const entityMap: Record<string, string> = {
			'&#8216;': '\u2018', // left single quotation mark
			'&#8217;': '\u2019', // right single quotation mark
			'&#8220;': '\u201C', // left double quotation mark
			'&#8221;': '\u201D', // right double quotation mark
			'&#8211;': '\u2013', // en dash
			'&#8212;': '\u2014', // em dash
			'&#8230;': '\u2026', // horizontal ellipsis
			'&#038;': '&',       // ampersand
			'&amp;': '&',        // ampersand
			'&lt;': '<',         // less than
			'&gt;': '>',         // greater than
			'&quot;': '"',       // quotation mark
			'&apos;': "'",       // apostrophe
		};

		let decoded = text;
		for (const [entity, char] of Object.entries(entityMap)) {
			decoded = decoded.replace(new RegExp(entity, 'g'), char);
		}
		
		// Handle numeric entities like &#123;
		decoded = decoded.replace(/&#(\d+);/g, (match, num) => {
			return String.fromCharCode(parseInt(num, 10));
		});
		
		return decoded;
	},

	// Extract plain text from WordPress content
	stripHtml(html: string): string {
		return html.replace(/<[^>]*>/g, '').trim();
	},

	// Get excerpt from content
	getExcerpt(content: string, length: number = 150): string {
		const plainText = this.stripHtml(content);
		return plainText.length > length 
			? plainText.substring(0, length).trim() + '...'
			: plainText;
	},

	// Format WordPress date
	formatDate(dateString: string, locale: string = 'en-US'): string {
		const date = new Date(dateString);
		return date.toLocaleDateString(locale, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	},

	// Get featured image URL from media ID (placeholder - needs server-side implementation)
	async getFeaturedImageUrl(mediaId: number, size: string = 'medium'): Promise<string | null> {
		if (!mediaId) return null;
		
		// This would need to be implemented server-side or passed as data
		// For now, return null as placeholder
		return null;
	},

	// Yoast SEO utility functions
	// Get SEO title with fallback to WordPress title
	getSEOTitle(yoastData?: YoastSEOData, wpTitle?: string): string {
		if (yoastData?.title) {
			return this.decodeHtmlEntities(this.stripHtml(yoastData.title));
		}
		if (wpTitle) {
			return this.decodeHtmlEntities(this.stripHtml(wpTitle));
		}
		return 'Untitled';
	},

	// Get SEO description with fallback to WordPress excerpt/content
	getSEODescription(yoastData?: YoastSEOData, wpExcerpt?: string, wpContent?: string): string {
		if (yoastData?.description) {
			return this.decodeHtmlEntities(this.stripHtml(yoastData.description));
		}
		if (wpExcerpt) {
			return this.getExcerpt(wpExcerpt, 160);
		}
		if (wpContent) {
			return this.getExcerpt(wpContent, 160);
		}
		return '';
	},

	// Get Open Graph title with fallback
	getOGTitle(yoastData?: YoastSEOData, wpTitle?: string): string {
		if (yoastData?.og_title) {
			return this.decodeHtmlEntities(this.stripHtml(yoastData.og_title));
		}
		return this.getSEOTitle(yoastData, wpTitle);
	},

	// Get Open Graph description with fallback
	getOGDescription(yoastData?: YoastSEOData, wpExcerpt?: string, wpContent?: string): string {
		if (yoastData?.og_description) {
			return this.decodeHtmlEntities(this.stripHtml(yoastData.og_description));
		}
		return this.getSEODescription(yoastData, wpExcerpt, wpContent);
	},

	// Get Open Graph image URL
	getOGImage(yoastData?: YoastSEOData): string | null {
		if (yoastData?.og_image && yoastData.og_image.length > 0) {
			return yoastData.og_image[0].url || null;
		}
		return null;
	},

	// Get canonical URL
	getCanonicalUrl(yoastData?: YoastSEOData, wpLink?: string): string | null {
		if (yoastData?.canonical) {
			return yoastData.canonical;
		}
		return wpLink || null;
	},

	// Check if post should be indexed
	shouldIndex(yoastData?: YoastSEOData): boolean {
		if (yoastData?.robots?.index) {
			return yoastData.robots.index !== 'noindex';
		}
		return true; // Default to indexable
	},

	// Check if post should be followed
	shouldFollow(yoastData?: YoastSEOData): boolean {
		if (yoastData?.robots?.follow) {
			return yoastData.robots.follow !== 'nofollow';
		}
		return true; // Default to followable
	},

	// Get robots meta content
	getRobotsContent(yoastData?: YoastSEOData): string {
		const robots: string[] = [];
		
		if (yoastData?.robots) {
			if (yoastData.robots.index) {
				robots.push(yoastData.robots.index);
			}
			if (yoastData.robots.follow) {
				robots.push(yoastData.robots.follow);
			}
			if (yoastData.robots['max-snippet']) {
				robots.push(`max-snippet:${yoastData.robots['max-snippet']}`);
			}
			if (yoastData.robots['max-image-preview']) {
				robots.push(`max-image-preview:${yoastData.robots['max-image-preview']}`);
			}
			if (yoastData.robots['max-video-preview']) {
				robots.push(`max-video-preview:${yoastData.robots['max-video-preview']}`);
			}
		}

		return robots.length > 0 ? robots.join(', ') : 'index, follow';
	},
};

// Cache utilities for performance
export const cacheUtils = {
	// Simple in-memory cache (consider using Redis in production)
	cache: new Map<string, { data: any; timestamp: number; ttl: number }>(),

	// Set cache with TTL
	set(key: string, data: any, ttlSeconds: number = 1800): void {
		this.cache.set(key, {
			data,
			timestamp: Date.now(),
			ttl: ttlSeconds * 1000,
		});
	},

	// Get from cache
	get<T>(key: string): T | null {
		const item = this.cache.get(key);
		if (!item) return null;

		// Check if expired
		if (Date.now() - item.timestamp > item.ttl) {
			this.cache.delete(key);
			return null;
		}

		return item.data as T;
	},

	// Clear cache
	clear(): void {
		this.cache.clear();
	},

	// Generate cache key
	generateKey(endpoint: string, params: Record<string, any> = {}): string {
		const sortedParams = Object.keys(params)
			.sort()
			.reduce((result, key) => {
				result[key] = params[key];
				return result;
			}, {} as Record<string, any>);

		return `wp_${endpoint}_${JSON.stringify(sortedParams)}`;
	},
};
