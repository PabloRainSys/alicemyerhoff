import { env } from '$env/dynamic/private';
import type { WordPressPost, WordPressPage, WordPressMedia, WordPressCategory, WordPressUser, APIResponse, NewsletterSubscription } from '$lib/types';

// WordPress API configuration (server-side only)
const WORDPRESS_API_URL = env.WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';
const WORDPRESS_API_KEY = env.WORDPRESS_API_KEY || '';

// API headers (server-side only)
const getHeaders = (): HeadersInit => {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};

	if (WORDPRESS_API_KEY) {
		// Use Basic Auth for WordPress Application Passwords
		const credentials = btoa(WORDPRESS_API_KEY);
		headers['Authorization'] = `Basic ${credentials}`;
	}

	return headers;
};

// Generic fetch function with error handling (server-side only)
async function wpFetch<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
	try {
		const url = `${WORDPRESS_API_URL}${endpoint}`;
		const response = await fetch(url, {
			...options,
			headers: {
				...getHeaders(),
				...options.headers,
			},
		});

		if (!response.ok) {
			throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();
		return {
			data,
			success: true,
		};
	} catch (error) {
		console.error('WordPress API fetch error:', error);
		return {
			data: null as T,
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error occurred',
		};
	}
}

// Server-side Posts API
export const serverPostsAPI = {
	// Get all posts
	async getAll(params: {
		page?: number;
		per_page?: number;
		categories?: number[];
		tags?: number[];
		search?: string;
		status?: string;
	} = {}): Promise<APIResponse<WordPressPost[]>> {
		const searchParams = new URLSearchParams();
		
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				if (Array.isArray(value)) {
					searchParams.append(key, value.join(','));
				} else {
					searchParams.append(key, value.toString());
				}
			}
		});

		// Add Yoast SEO fields to the request
		searchParams.append('_fields', 'id,date,date_gmt,guid,modified,modified_gmt,slug,status,type,link,title,content,excerpt,author,featured_media,comment_status,ping_status,sticky,template,format,meta,categories,tags,_links,yoast_head,yoast_head_json');

		const endpoint = `/posts${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
		return wpFetch<WordPressPost[]>(endpoint);
	},

	// Get single post by ID
	async getById(id: number): Promise<APIResponse<WordPressPost>> {
		const searchParams = new URLSearchParams();
		searchParams.append('_fields', 'id,date,date_gmt,guid,modified,modified_gmt,slug,status,type,link,title,content,excerpt,author,featured_media,comment_status,ping_status,sticky,template,format,meta,categories,tags,_links,yoast_head,yoast_head_json');
		return wpFetch<WordPressPost>(`/posts/${id}?${searchParams.toString()}`);
	},

	// Get single post by slug
	async getBySlug(slug: string): Promise<APIResponse<WordPressPost[]>> {
		const searchParams = new URLSearchParams();
		searchParams.append('slug', slug);
		searchParams.append('_fields', 'id,date,date_gmt,guid,modified,modified_gmt,slug,status,type,link,title,content,excerpt,author,featured_media,comment_status,ping_status,sticky,template,format,meta,categories,tags,_links,yoast_head,yoast_head_json');
		return wpFetch<WordPressPost[]>(`/posts?${searchParams.toString()}`);
	},

	// Get featured posts
	async getFeatured(limit: number = 5): Promise<APIResponse<WordPressPost[]>> {
		const searchParams = new URLSearchParams();
		searchParams.append('sticky', 'true');
		searchParams.append('per_page', limit.toString());
		searchParams.append('_fields', 'id,date,date_gmt,guid,modified,modified_gmt,slug,status,type,link,title,content,excerpt,author,featured_media,comment_status,ping_status,sticky,template,format,meta,categories,tags,_links,yoast_head,yoast_head_json');
		return wpFetch<WordPressPost[]>(`/posts?${searchParams.toString()}`);
	},
};

// Server-side Pages API
export const serverPagesAPI = {
	// Get all pages
	async getAll(params: {
		page?: number;
		per_page?: number;
		parent?: number;
		search?: string;
		status?: string;
	} = {}): Promise<APIResponse<WordPressPage[]>> {
		const searchParams = new URLSearchParams();
		
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				searchParams.append(key, value.toString());
			}
		});

		const endpoint = `/pages${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
		return wpFetch<WordPressPage[]>(endpoint);
	},

	// Get single page by ID
	async getById(id: number): Promise<APIResponse<WordPressPage>> {
		return wpFetch<WordPressPage>(`/pages/${id}`);
	},

	// Get single page by slug
	async getBySlug(slug: string): Promise<APIResponse<WordPressPage[]>> {
		return wpFetch<WordPressPage[]>(`/pages?slug=${slug}`);
	},
};

// Server-side Media API
export const serverMediaAPI = {
	// Get media by ID
	async getById(id: number): Promise<APIResponse<WordPressMedia>> {
		return wpFetch<WordPressMedia>(`/media/${id}`);
	},

	// Get all media
	async getAll(params: {
		page?: number;
		per_page?: number;
		media_type?: 'image' | 'file';
		mime_type?: string;
	} = {}): Promise<APIResponse<WordPressMedia[]>> {
		const searchParams = new URLSearchParams();
		
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				searchParams.append(key, value.toString());
			}
		});

		const endpoint = `/media${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
		return wpFetch<WordPressMedia[]>(endpoint);
	},
};

// Server-side Categories API
export const serverCategoriesAPI = {
	// Get category by ID
	async getById(id: number): Promise<APIResponse<WordPressCategory>> {
		return wpFetch<WordPressCategory>(`/categories/${id}`);
	},

	// Get multiple categories by IDs
	async getByIds(ids: number[]): Promise<APIResponse<WordPressCategory[]>> {
		if (ids.length === 0) {
			return {
				data: [],
				success: true,
			};
		}
		
		const idsParam = ids.join(',');
		return wpFetch<WordPressCategory[]>(`/categories?include=${idsParam}`);
	},

	// Get all categories
	async getAll(params: {
		page?: number;
		per_page?: number;
		search?: string;
		parent?: number;
	} = {}): Promise<APIResponse<WordPressCategory[]>> {
		const searchParams = new URLSearchParams();
		
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				searchParams.append(key, value.toString());
			}
		});

		const endpoint = `/categories${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
		return wpFetch<WordPressCategory[]>(endpoint);
	},
};

// Server-side Users API
export const serverUsersAPI = {
	// Get user by ID
	async getById(id: number): Promise<APIResponse<WordPressUser>> {
		return wpFetch<WordPressUser>(`/users/${id}`);
	},

	// Get multiple users by IDs
	async getByIds(ids: number[]): Promise<APIResponse<WordPressUser[]>> {
		if (ids.length === 0) {
			return {
				data: [],
				success: true,
			};
		}
		
		const idsParam = ids.join(',');
		return wpFetch<WordPressUser[]>(`/users?include=${idsParam}`);
	},

	// Get all users
	async getAll(params: {
		page?: number;
		per_page?: number;
		search?: string;
		roles?: string[];
	} = {}): Promise<APIResponse<WordPressUser[]>> {
		const searchParams = new URLSearchParams();
		
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) {
				if (Array.isArray(value)) {
					searchParams.append(key, value.join(','));
				} else {
					searchParams.append(key, value.toString());
				}
			}
		});

		const endpoint = `/users${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
		return wpFetch<WordPressUser[]>(endpoint);
	},
};

// Server-side Newsletter API
export const serverNewsletterAPI = {
	// Subscribe to newsletter using secure custom endpoint
	async subscribe(email: string, source: string = 'website'): Promise<APIResponse<any>> {
		try {
			// Use the correct custom REST API endpoint path
			const url = `${WORDPRESS_API_URL.replace('/wp/v2', '')}/myerhoff-newsletter/v1/subscribe`;
			console.log('Newsletter subscribe URL:', url);
			
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					...getHeaders(),
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					source
				})
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error('Newsletter subscribe error response:', response.status, errorText);
				throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			return {
				data,
				success: true,
			};
		} catch (error) {
			console.error('Newsletter subscription error:', error);
			return {
				data: null,
				success: false,
				error: error instanceof Error ? error.message : 'Failed to subscribe to newsletter'
			};
		}
	},

	// Check if email is already subscribed using secure custom endpoint
	async isSubscribed(email: string): Promise<APIResponse<boolean>> {
		try {
			// Use the correct custom REST API endpoint path
			const url = `${WORDPRESS_API_URL.replace('/wp/v2', '')}/myerhoff-newsletter/v1/check?email=${encodeURIComponent(email)}`;
			console.log('Newsletter check URL:', url);
			
			const response = await fetch(url, {
				method: 'GET',
				headers: getHeaders()
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error('Newsletter check error response:', response.status, errorText);
				throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			
			return {
				data: data.subscribed || false,
				success: true
			};
		} catch (error) {
			console.error('Newsletter subscription check error:', error);
			return {
				data: false,
				success: false,
				error: error instanceof Error ? error.message : 'Failed to check subscription status'
			};
		}
	},

	// Get all newsletter subscriptions (admin only - not used by public API)
	async getAll(params: {
		page?: number;
		per_page?: number;
		status?: 'active' | 'unsubscribed';
	} = {}): Promise<APIResponse<any[]>> {
		// This method is for admin use only and should not be accessible via public API
		// It's kept for backward compatibility but will return empty results
		return {
			data: [],
			success: true
		};
	},

	// Unsubscribe from newsletter using secure custom endpoint
	async unsubscribe(email: string): Promise<APIResponse<any>> {
		try {
			// Use the correct custom REST API endpoint path
			const url = `${WORDPRESS_API_URL.replace('/wp/v2', '')}/myerhoff-newsletter/v1/unsubscribe`;
			console.log('Newsletter unsubscribe URL:', url);
			
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					...getHeaders(),
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email
				})
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error('Newsletter unsubscribe error response:', response.status, errorText);
				throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			return {
				data,
				success: true,
			};
		} catch (error) {
			console.error('Newsletter unsubscribe error:', error);
			return {
				data: null,
				success: false,
				error: error instanceof Error ? error.message : 'Failed to unsubscribe from newsletter'
			};
		}
	}
};

// Cache utilities for performance (server-side)
export const serverCacheUtils = {
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

	// Clear specific cache entry
	delete(key: string): void {
		this.cache.delete(key);
	},

	// Clear cache entries by pattern
	clearByPattern(pattern: string): void {
		const keys = Array.from(this.cache.keys());
		keys.forEach(key => {
			if (key.includes(pattern)) {
				this.cache.delete(key);
			}
		});
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
