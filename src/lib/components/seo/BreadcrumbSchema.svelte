<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	
	export let items: Array<{name: string, url: string}> = [];
	
	// Generate breadcrumb schema
	const breadcrumbSchema = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": items.map((item, index) => ({
			"@type": "ListItem",
			"position": index + 1,
			"name": item.name,
			"item": `${siteConfig.url}${item.url}`
		}))
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`}
</svelte:head>
