import type { SiteConfig, NavItem } from '$lib/types';
import { PUBLIC_SITE_URL } from '$env/static/public';

export const siteConfig: SiteConfig = {
	name: 'Myerhoff Consulting',
	url: PUBLIC_SITE_URL || 'http://localhost:5173',
	description: 'Expert revenue growth consulting services to scale your business sustainably. Strategic planning, implementation, and capacity building for lasting revenue growth.',
	shortDescription: 'Expert revenue growth consulting to help mission-driven businesses scale sustainably while preserving their core values.',
	ogImage: '/assets/myerhoff/cta/ctahome.png',
	author: 'Myerhoff Consulting',
	keywords: [
		'revenue consulting for mission-led organizations',
		'mission-led organizations',
		'nonprofit revenue consulting',
		'social enterprise consulting',
		'purpose-driven business consulting',
		'revenue growth consulting',
		'business growth consulting',
		'revenue strategy',
		'growth consulting services',
		'consulting',
		'business consulting',
		'strategy',
		'management consulting',
		'professional services',
		'business growth',
		'corporate consulting',
		'revenue optimization',
		'sustainable growth',
		'values-aligned growth',
		'mission-driven consulting'
	],
	social: {
		linkedin: 'https://linkedin.com/company/myerhoff-consulting',
		twitter: 'https://twitter.com/myerhoffconsult',
		// Add other social links as needed
	},
	links: {
		calendly: 'https://calendly.com/alicemyerhoff/book-a-call',
		sections: {
			revenueDignostic: '/services#revenue-diagnostic',
			implementation: '/services#implementation-sales-enablement',
			capacityBuilding: '/services#capacity-building'
		}
	}
};

export const mainNav: NavItem[] = [
	{
		title: 'Home',
		href: '/',
		description: 'Start here. Always.'
	},
	{
		title: 'Blog',
		href: '/blog',
		description: 'Learn from the leaders'
	},
	{
		title: 'Training',
		href: '/training',
		description: 'The best advices'
	},
	{
		title: 'About',
		href: '/about',
		description: 'Get to know me'
	}
];

export const footerNav: NavItem[] = [
	{
		title: 'Privacy Policy',
		href: '/privacy',
	},
	{
		title: 'Terms of Service',
		href: '/terms',
	},
	{
		title: 'Sitemap',
		href: '/sitemap.xml',
		external: true
	}
];

// Export service links for easy access throughout the application
export const serviceLinks = {
	revenueDignostic: siteConfig.links.sections.revenueDignostic,
	implementation: siteConfig.links.sections.implementation,
	capacityBuilding: siteConfig.links.sections.capacityBuilding,
	calendly: siteConfig.links.calendly
};
