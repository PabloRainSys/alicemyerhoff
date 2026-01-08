<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	
	// Organization and Service structured data for homepage
	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "Myerhoff Consulting",
		"url": siteConfig.url,
		"description": siteConfig.shortDescription,
		"foundingDate": "2020",
		"founder": {
			"@type": "Person",
			"name": "Alice Myerhoff"
		},
		"address": {
			"@type": "PostalAddress",
			"addressCountry": "US"
		},
		"sameAs": [
			siteConfig.social.linkedin,
			siteConfig.social.twitter
		],
		"hasOfferCatalog": {
			"@type": "OfferCatalog",
			"name": "Revenue Growth Consulting Services",
			"itemListElement": [
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Revenue Growth Diagnostic",
						"description": "Comprehensive analysis of your organization's current revenue approach to identify opportunities and create a tailored blueprint for success.",
						"provider": {
							"@type": "Organization",
							"name": "Myerhoff Consulting"
						}
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Implementation & Sales Enablement",
						"description": "Building systems, processes, and toolkits that make growth consistent and sustainable, from CRM setup to sales materials.",
						"provider": {
							"@type": "Organization",
							"name": "Myerhoff Consulting"
						}
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Capacity Building",
						"description": "Hands-on training, coaching, and leadership support to develop skills and mindset needed for sustained revenue growth.",
						"provider": {
							"@type": "Organization",
							"name": "Myerhoff Consulting"
						}
					}
				}
			]
		}
	};

	const serviceSchema = {
		"@context": "https://schema.org",
		"@type": "ProfessionalService",
		"name": "Revenue Growth Consulting",
		"description": "Expert revenue growth consulting services to help mission-driven businesses unlock their full potential through data-driven strategies, process optimization, and innovative solutions.",
		"provider": {
			"@type": "Organization",
			"name": "Myerhoff Consulting",
			"url": siteConfig.url
		},
		"areaServed": {
			"@type": "Country",
			"name": "United States"
		},
		"serviceType": "Business Consulting",
		"category": "Revenue Growth Consulting",
		"hasOfferCatalog": {
			"@type": "OfferCatalog",
			"name": "Revenue Growth Consulting Services",
			"itemListElement": [
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Revenue Growth Diagnostic",
						"category": "Business Analysis"
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Implementation & Sales Enablement",
						"category": "Business Implementation"
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Capacity Building",
						"category": "Training & Development"
					}
				}
			]
		}
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(organizationSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>`}
</svelte:head>
