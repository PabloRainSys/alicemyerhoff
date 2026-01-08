<script lang="ts">
	// FAQ schema data for services page
	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [
			{
				"@type": "Question",
				"name": "What is a Revenue Diagnostic and why do I need one?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "A Revenue Diagnostic is a comprehensive audit of how your team approaches revenue generation, especially valuable for mission-led organizations. We examine your culture, capacity, systems, and processes to identify where you're leaving money on the table and create a clear roadmap for sustainable growth."
				}
			},
			{
				"@type": "Question",
				"name": "How long does the Revenue Diagnostic take?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "The diagnostic process typically takes 2-4 weeks, depending on your team size and complexity. This includes stakeholder interviews, system audits, and strategy development. You'll receive a comprehensive Blueprint for Success with actionable recommendations."
				}
			},
			{
				"@type": "Question",
				"name": "What if my team is uncomfortable with sales?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "That's exactly why we're here. We specialize in helping values-driven organizations grow in ways that feel authentic and aligned. Our approach focuses on relationship-building and meaningful conversations, not pushy sales tactics."
				}
			},
			{
				"@type": "Question",
				"name": "Do you help implement the recommendations or just provide a plan?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "We don't just leave you with a plan. In Phase 2, we roll up our sleeves and implement alongside your mission-driven team. This includes CRM setup, creating sales toolkits, building pipeline tools, and ensuring your team knows how to use everything effectively."
				}
			},
			{
				"@type": "Question",
				"name": "What CRM systems do you work with?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "We work with most major CRM platforms and focus on making tools work for you, not against you. Our approach is platform-agnostic—we'll optimize whatever system fits your team's needs and budget, or help you choose the right one."
				}
			},
			{
				"@type": "Question",
				"name": "How do you ensure the tools actually get used by our team?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "We don't just build systems—we build adoption. Through hands-on training, clear documentation, and ongoing support, we ensure your team feels confident using new tools. We make implementation practical and accessible for everyone."
				}
			},
			{
				"@type": "Question",
				"name": "What's the difference between training and sales coaching?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Training focuses on group workshops and skill-building sessions that make outreach feel doable for everyone. Sales coaching provides one-on-one support to help individuals build confidence, overcome specific challenges, and take action on their goals."
				}
			},
			{
				"@type": "Question",
				"name": "How does Fractional Sales Leadership work?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Fractional Sales Leadership provides senior-level sales support without full-time overhead. We work with mission-led organizations on a part-time basis, offering strategic guidance, pipeline management, and leadership during transitions or scaling periods."
				}
			},
			{
				"@type": "Question",
				"name": "How do we know when we're ready to move from one phase to the next?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Each phase builds on the previous one. You're ready for Phase 2 when you have a clear blueprint and commitment to implementation. Phase 3 begins when systems are working and you're ready to build internal capacity for long-term growth."
				}
			}
		]
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
</svelte:head>
