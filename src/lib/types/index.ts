// Extended WordPress Post with featured media data
export interface WordPressPostWithMedia extends WordPressPost {
	featured_media_data?: WordPressMedia;
}

// Yoast SEO Types
export interface YoastSEOData {
	title?: string;
	description?: string;
	robots?: {
		index?: string;
		follow?: string;
		'max-snippet'?: string;
		'max-image-preview'?: string;
		'max-video-preview'?: string;
	};
	canonical?: string;
	og_locale?: string;
	og_type?: string;
	og_title?: string;
	og_description?: string;
	og_url?: string;
	og_site_name?: string;
	article_published_time?: string;
	article_modified_time?: string;
	og_image?: Array<{
		width?: number;
		height?: number;
		url?: string;
		type?: string;
	}>;
	author?: string;
	twitter_card?: string;
	twitter_creator?: string;
	twitter_site?: string;
	twitter_label1?: string;
	twitter_data1?: string;
	twitter_label2?: string;
	twitter_data2?: string;
	schema?: Record<string, any>;
}

// WordPress API Types
export interface WordPressPost {
	id: number;
	date: string;
	date_gmt: string;
	guid: {
		rendered: string;
	};
	modified: string;
	modified_gmt: string;
	slug: string;
	status: 'publish' | 'future' | 'draft' | 'pending' | 'private';
	type: string;
	link: string;
	title: {
		rendered: string;
	};
	content: {
		rendered: string;
		protected: boolean;
	};
	excerpt: {
		rendered: string;
		protected: boolean;
	};
	author: number;
	featured_media: number;
	comment_status: 'open' | 'closed';
	ping_status: 'open' | 'closed';
	sticky: boolean;
	template: string;
	format: string;
	meta: Record<string, any>;
	categories: number[];
	tags: number[];
	_links: Record<string, any>;
	// Yoast SEO fields
	yoast_head?: string;
	yoast_head_json?: YoastSEOData;
}

export interface WordPressPage {
	id: number;
	date: string;
	date_gmt: string;
	guid: {
		rendered: string;
	};
	modified: string;
	modified_gmt: string;
	slug: string;
	status: 'publish' | 'future' | 'draft' | 'pending' | 'private';
	type: string;
	link: string;
	title: {
		rendered: string;
	};
	content: {
		rendered: string;
		protected: boolean;
	};
	excerpt: {
		rendered: string;
		protected: boolean;
	};
	author: number;
	featured_media: number;
	comment_status: 'open' | 'closed';
	ping_status: 'open' | 'closed';
	template: string;
	parent: number;
	menu_order: number;
	meta: Record<string, any>;
	_links: Record<string, any>;
}

export interface WordPressMedia {
	id: number;
	date: string;
	slug: string;
	type: string;
	link: string;
	title: {
		rendered: string;
	};
	author: number;
	comment_status: 'open' | 'closed';
	ping_status: 'open' | 'closed';
	template: string;
	meta: Record<string, any>;
	description: {
		rendered: string;
	};
	caption: {
		rendered: string;
	};
	alt_text: string;
	media_type: 'image' | 'file';
	mime_type: string;
	media_details: {
		width: number;
		height: number;
		file: string;
		sizes: Record<string, {
			file: string;
			width: number;
			height: number;
			mime_type: string;
			source_url: string;
		}>;
		image_meta: Record<string, any>;
	};
	source_url: string;
	_links: Record<string, any>;
}

export interface WordPressCategory {
	id: number;
	count: number;
	description: string;
	link: string;
	name: string;
	slug: string;
	taxonomy: string;
	parent: number;
	meta: Record<string, any>;
	_links: Record<string, any>;
}

export interface WordPressUser {
	id: number;
	name: string;
	url: string;
	description: string;
	link: string;
	slug: string;
	avatar_urls: {
		'24': string;
		'48': string;
		'96': string;
	};
	meta: Record<string, any>;
	_links: Record<string, any>;
}

// Site Configuration Types
export interface SiteConfig {
	name: string;
	url: string;
	description: string;
	shortDescription: string;
	ogImage: string;
	author: string;
	keywords: string[];
	social: {
		twitter?: string;
		linkedin?: string;
		facebook?: string;
		instagram?: string;
	};
	links: {
		calendly: string;
		sections: {
			revenueDignostic: string;
			implementation: string;
			capacityBuilding: string;
		};
	};
}

// Navigation Types
export interface NavItem {
	title: string;
	href: string;
	description?: string;
	external?: boolean;
	disabled?: boolean;
}

// SEO Types
export interface SEOData {
	title: string;
	description: string;
	keywords?: string[];
	image?: string;
	url?: string;
	type?: 'website' | 'article' | 'profile';
	publishedTime?: string;
	modifiedTime?: string;
	author?: string;
}

// Form Types
export interface ContactFormData {
	name: string;
	email: string;
	company?: string;
	phone?: string;
	message: string;
	subject?: string;
}

// Newsletter Types
export interface NewsletterSubscription {
	email: string;
	subscribed_at: string;
	status: 'active' | 'unsubscribed';
	source?: string;
}

export interface NewsletterFormData {
	email: string;
	recaptchaToken?: string;
}

// API Response Types
export interface APIResponse<T> {
	data: T;
	success: boolean;
	message?: string;
	error?: string;
}

// Testimonial Types
export interface Testimonial {
	id: string;
	author: {
		name: string;
		position: string;
		company: string;
		picture: string;
		linkedin: string;
	};
	content: string;
	companyLogo: string;
}

// Performance Types
export interface PerformanceMetrics {
	fcp: number; // First Contentful Paint
	lcp: number; // Largest Contentful Paint
	fid: number; // First Input Delay
	cls: number; // Cumulative Layout Shift
	ttfb: number; // Time to First Byte
}
