<script lang="ts">
	import type { WordPressPostWithMedia } from '$lib/types';
	import { siteConfig } from '$lib/config/site';
	import { wpUtils } from '$lib/wordpress/api';

	// Props
	export let posts: WordPressPostWithMedia[];
	export let pagination: {
		currentPage: number;
		totalPages: number;
		hasNextPage: boolean;
		hasPrevPage: boolean;
		perPage: number;
	};
	export let search: string | undefined = undefined;

	// Generate URLs
	$: baseUrl = `${siteConfig.url}/blog`;
	$: currentUrl = search 
		? `${baseUrl}?search=${encodeURIComponent(search)}${pagination.currentPage > 1 ? `&page=${pagination.currentPage}` : ''}`
		: pagination.currentPage > 1 
			? `${baseUrl}?page=${pagination.currentPage}`
			: baseUrl;

	// Generate page title and description
	$: pageTitle = search 
		? `Search results for "${search}"${pagination.currentPage > 1 ? ` - Page ${pagination.currentPage}` : ''}`
		: pagination.currentPage > 1 
			? `Blog - Page ${pagination.currentPage}`
			: 'Blog';

	$: pageDescription = search
		? `Search results for "${search}" on ${siteConfig.name} blog. Find articles, insights, and expert advice.`
		: pagination.currentPage > 1
			? `${siteConfig.name} blog articles - Page ${pagination.currentPage}. Latest insights, industry trends, and expert advice.`
			: `Latest insights and articles from ${siteConfig.name}. Stay updated with industry trends, best practices, and expert advice.`;

	// Generate CollectionPage schema
	$: collectionSchema = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		"@id": `${currentUrl}#collection`,
		"name": `${pageTitle} - ${siteConfig.name}`,
		"description": pageDescription,
		"url": currentUrl,
		"mainEntity": {
			"@type": "ItemList",
			"@id": `${currentUrl}#itemlist`,
			"name": `${pageTitle} - ${siteConfig.name}`,
			"description": pageDescription,
			"numberOfItems": posts.length,
			"itemListElement": posts.map((post, index) => ({
				"@type": "ListItem",
				"position": index + 1,
				"item": {
					"@type": "Article",
					"@id": `${siteConfig.url}/blog/${post.slug}#article`,
					"headline": wpUtils.getSEOTitle(post.yoast_head_json, post.title.rendered),
					"description": wpUtils.getSEODescription(post.yoast_head_json, post.excerpt.rendered, post.content.rendered),
					"url": `${siteConfig.url}/blog/${post.slug}`,
					"datePublished": post.yoast_head_json?.article_published_time || post.date,
					"dateModified": post.yoast_head_json?.article_modified_time || post.modified,
					"author": {
						"@type": "Person",
						"name": siteConfig.author,
						"url": siteConfig.url
					},
					"publisher": {
						"@id": `${siteConfig.url}#organization`
					},
					"image": post.featured_media_data ? {
						"@type": "ImageObject",
						"url": post.featured_media_data.source_url,
						"width": post.featured_media_data.media_details?.width || 1200,
						"height": post.featured_media_data.media_details?.height || 630
					} : {
						"@type": "ImageObject",
						"url": `${siteConfig.url}/assets/myerhoff/logo.png`,
						"width": 200,
						"height": 60
					}
				}
			}))
		},
		"isPartOf": {
			"@id": `${siteConfig.url}#website`
		},
		"breadcrumb": {
			"@id": `${currentUrl}#breadcrumb`
		}
	};

	// Generate breadcrumb schema
	$: breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"@id": `${currentUrl}#breadcrumb`,
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
				"item": baseUrl
			},
			...(search ? [{
				"@type": "ListItem",
				"position": 3,
				"name": `Search: ${search}`,
				"item": currentUrl
			}] : []),
			...(pagination.currentPage > 1 ? [{
				"@type": "ListItem",
				"position": search ? 4 : 3,
				"name": `Page ${pagination.currentPage}`,
				"item": currentUrl
			}] : [])
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
				"urlTemplate": `${baseUrl}?search={search_term_string}`
			},
			"query-input": "required name=search_term_string"
		}
	};

	// Generate organization schema
	$: organizationSchema = {
		"@context": "https://schema.org",
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
	};

	// Combine all schemas
	$: combinedSchema = {
		"@context": "https://schema.org",
		"@graph": [
			websiteSchema,
			organizationSchema,
			collectionSchema,
			breadcrumbSchema
		]
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(combinedSchema, null, 0)}</script>`}
</svelte:head>
