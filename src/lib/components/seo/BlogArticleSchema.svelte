<script lang="ts">
	import type { WordPressPost, WordPressUser, WordPressCategory, WordPressMedia } from '$lib/types';
	import { wpUtils } from '$lib/wordpress/api';
	import { siteConfig } from '$lib/config/site';

	// Props
	export let post: WordPressPost;
	export let authorData: WordPressUser | null = null;
	export let primaryCategory: WordPressCategory | null = null;
	export let featuredMedia: WordPressMedia | null = null;

	// Generate word count from content
	function getWordCount(content: string): number {
		return wpUtils.stripHtml(content).split(/\s+/).filter(word => word.length > 0).length;
	}

	// Generate reading time in minutes
	function getReadingTime(content: string): number {
		const wordsPerMinute = 200;
		const wordCount = getWordCount(content);
		return Math.ceil(wordCount / wordsPerMinute);
	}

	// Generate canonical URL
	$: canonicalUrl = `${siteConfig.url}/blog/${post.slug}`;

	// Generate schema data
	$: schemaData = {
		"@context": "https://schema.org",
		"@type": "Article",
		"@id": `${canonicalUrl}#article`,
		"headline": wpUtils.getSEOTitle(post.yoast_head_json, post.title.rendered),
		"description": wpUtils.getSEODescription(post.yoast_head_json, post.excerpt.rendered, post.content.rendered),
		"url": canonicalUrl,
		"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": canonicalUrl
		},
		"author": authorData ? {
			"@type": "Person",
			"@id": `${siteConfig.url}#person-${authorData.id}`,
			"name": authorData.name,
			"description": authorData.description || `Author at ${siteConfig.name}`,
			"url": authorData.url || siteConfig.url,
			"image": authorData.avatar_urls ? {
				"@type": "ImageObject",
				"url": authorData.avatar_urls['96'],
				"width": 96,
				"height": 96
			} : undefined
		} : {
			"@type": "Person",
			"name": siteConfig.author,
			"url": siteConfig.url
		},
		"publisher": {
			"@type": "Organization",
			"@id": `${siteConfig.url}#organization`,
			"name": siteConfig.name,
			"description": siteConfig.description,
			"url": siteConfig.url,
			"logo": {
				"@type": "ImageObject",
				"url": `${siteConfig.url}/assets/myerhoff/logo.png`,
				"width": 200,
				"height": 60
			},
			"sameAs": Object.values(siteConfig.social).filter(Boolean)
		},
		"datePublished": post.yoast_head_json?.article_published_time || post.date,
		"dateModified": post.yoast_head_json?.article_modified_time || post.modified,
		"articleSection": primaryCategory?.name || "Business",
		"keywords": primaryCategory?.name ? [primaryCategory.name] : ["Business", "Consulting"],
		"wordCount": getWordCount(post.content.rendered),
		"timeRequired": `PT${getReadingTime(post.content.rendered)}M`,
		"inLanguage": "en-US",
		"isAccessibleForFree": true,
		"image": featuredMedia ? {
			"@type": "ImageObject",
			"@id": `${canonicalUrl}#primaryimage`,
			"url": featuredMedia.source_url,
			"width": featuredMedia.media_details?.width || 1200,
			"height": featuredMedia.media_details?.height || 630,
			"caption": featuredMedia.caption?.rendered || featuredMedia.alt_text || wpUtils.getSEOTitle(post.yoast_head_json, post.title.rendered)
		} : {
			"@type": "ImageObject",
			"url": `${siteConfig.url}/assets/myerhoff/logo.png`,
			"width": 200,
			"height": 60
		},
		"potentialAction": {
			"@type": "ReadAction",
			"target": canonicalUrl
		}
	};

	// Generate breadcrumb schema
	$: breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"@id": `${canonicalUrl}#breadcrumb`,
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "Home",
				"item": siteConfig.url
			},
			{
				"@type": "ListItem",
				"position": 2,
				"name": "Blog",
				"item": `${siteConfig.url}/blog`
			},
			{
				"@type": "ListItem",
				"position": 3,
				"name": wpUtils.getSEOTitle(post.yoast_head_json, post.title.rendered),
				"item": canonicalUrl
			}
		]
	};

	// Generate website schema
	$: websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": `${siteConfig.url}#website`,
		"name": siteConfig.name,
		"description": siteConfig.description,
		"url": siteConfig.url,
		"publisher": {
			"@id": `${siteConfig.url}#organization`
		},
		"potentialAction": {
			"@type": "SearchAction",
			"target": {
				"@type": "EntryPoint",
				"urlTemplate": `${siteConfig.url}/blog?search={search_term_string}`
			},
			"query-input": "required name=search_term_string"
		}
	};

	// Combine all schemas
	$: combinedSchema = {
		"@context": "https://schema.org",
		"@graph": [
			websiteSchema,
			schemaData,
			breadcrumbSchema
		]
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(combinedSchema, null, 0)}</script>`}
</svelte:head>
