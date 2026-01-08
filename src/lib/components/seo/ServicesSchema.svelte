<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	
	// Services schema data
	const servicesSchema = {
		"@context": "https://schema.org",
		"@type": "Service",
		"name": "Revenue Consulting for Mission-Led Organizations",
		"description": "Expert revenue consulting for mission-led organizations. We help nonprofits, social enterprises, and purpose-driven companies build sustainable growth strategies that align with their values.",
		"provider": {
			"@type": "Organization",
			"name": "Myerhoff Consulting",
			"url": siteConfig.url,
			"description": "Professional consulting services specializing in revenue growth for mission-led organizations",
			"contactPoint": {
				"@type": "ContactPoint",
				"contactType": "customer service",
				"url": siteConfig.links.calendly
			},
			"sameAs": [
				siteConfig.social.linkedin,
				siteConfig.social.twitter
			]
		},
		"serviceType": "Revenue Consulting",
		"category": "Business Consulting",
		"areaServed": {
			"@type": "Place",
			"name": "Global"
		},
		"audience": {
			"@type": "Audience",
			"audienceType": "Mission-led organizations, nonprofits, social enterprises, purpose-driven companies"
		},
		"hasOfferCatalog": {
			"@type": "OfferCatalog",
			"name": "Revenue Consulting Services",
			"itemListElement": [
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Revenue Diagnostic",
						"description": "Comprehensive audit of how your team approaches revenue generation, examining culture, capacity, systems, and processes.",
						"category": "Business Analysis"
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Implementation & Enablement",
						"description": "Values-aligned revenue strategy implementation including CRM setup, sales toolkits, and pipeline tools.",
						"category": "Implementation Services"
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Service",
						"name": "Capacity Building",
						"description": "Training, sales coaching, and fractional sales leadership to build mission-driven team capabilities.",
						"category": "Training & Coaching"
					}
				}
			]
		}
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(servicesSchema)}</script>`}
</svelte:head>
