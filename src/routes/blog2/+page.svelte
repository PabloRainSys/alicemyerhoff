<script lang="ts">
	import type { WordPressPostWithMedia } from '$lib/types';
	import BlogCard from '$lib/components/blog/BlogCard.svelte';
	import Newsletter from '$lib/components/sections/Newsletter.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { BlogCollectionSchema } from '$lib/components/seo';
	import { siteConfig } from '$lib/config/site';

	interface PageData {
		posts: WordPressPostWithMedia[];
		pagination: {
			currentPage: number;
			totalPages: number;
			hasNextPage: boolean;
			hasPrevPage: boolean;
			perPage: number;
		};
		search?: string;
	}

	export let data: PageData;

	$: ({ posts, pagination, search } = data);

	// Generate dynamic URLs and content
	$: baseUrl = `${siteConfig.url}/blog`;
	$: currentUrl = search 
		? `${baseUrl}?search=${encodeURIComponent(search)}${pagination.currentPage > 1 ? `&page=${pagination.currentPage}` : ''}`
		: pagination.currentPage > 1 
			? `${baseUrl}?page=${pagination.currentPage}`
			: baseUrl;

	// Generate dynamic page title and description
	$: pageTitle = search 
		? `Search results for "${search}"${pagination.currentPage > 1 ? ` - Page ${pagination.currentPage}` : ''} - ${siteConfig.name}`
		: pagination.currentPage > 1 
			? `Blog - Page ${pagination.currentPage} - ${siteConfig.name}`
			: `Blog - ${siteConfig.name}`;

	$: pageDescription = search
		? `Search results for "${search}" on ${siteConfig.name} blog. Find articles, insights, and expert advice.`
		: pagination.currentPage > 1
			? `${siteConfig.name} blog articles - Page ${pagination.currentPage}. Latest insights, industry trends, and expert advice.`
			: `Latest insights and articles from ${siteConfig.name}. Stay updated with industry trends, best practices, and expert advice.`;

	// Generate pagination URLs
	$: prevUrl = pagination.hasPrevPage 
		? search 
			? `${baseUrl}?search=${encodeURIComponent(search)}${pagination.currentPage > 2 ? `&page=${pagination.currentPage - 1}` : ''}`
			: pagination.currentPage > 2 
				? `${baseUrl}?page=${pagination.currentPage - 1}`
				: baseUrl
		: null;

	$: nextUrl = pagination.hasNextPage 
		? search 
			? `${baseUrl}?search=${encodeURIComponent(search)}&page=${pagination.currentPage + 1}`
			: `${baseUrl}?page=${pagination.currentPage + 1}`
		: null;

	// Handle pagination
	function goToPage(pageNum: number) {
		const url = new URL($page.url);
		url.searchParams.set('page', pageNum.toString());
		goto(url.toString());
	}

	// Handle search
	function handleSearch(event: Event) {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const searchTerm = formData.get('search') as string;
		
		const url = new URL($page.url);
		if (searchTerm) {
			url.searchParams.set('search', searchTerm);
		} else {
			url.searchParams.delete('search');
		}
		url.searchParams.delete('page'); // Reset to first page
		goto(url.toString());
	}
</script>

<svelte:head>
	<!-- Dynamic title and meta tags -->
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta name="robots" content="index, follow" />
	
	<!-- Canonical URL -->
	<link rel="canonical" href={currentUrl} />
	
	<!-- Pagination links -->
	{#if prevUrl}
		<link rel="prev" href={prevUrl} />
	{/if}
	{#if nextUrl}
		<link rel="next" href={nextUrl} />
	{/if}
	
	<!-- Open Graph tags -->
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:image" content="{siteConfig.url}/assets/myerhoff/logo.png" />
	<meta property="og:site_name" content={siteConfig.name} />
	
	<!-- Twitter Card tags -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content="{siteConfig.url}/assets/myerhoff/logo.png" />
	
	<!-- Additional meta tags -->
	<meta property="article:author" content={siteConfig.author} />
	<meta name="author" content={siteConfig.author} />
</svelte:head>

<!-- Schema.org structured data -->
<BlogCollectionSchema {posts} {pagination} {search} />

<div class="container mx-auto px-4 py-8">
	<!-- Header Section -->
	<div class="text-center mb-12">
		<h1 class="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
		<p class="text-xl text-gray-600 max-w-2xl mx-auto">
			Stay updated with the latest insights, industry trends, and expert advice from our consulting team.
		</p>
	</div>

	<!-- Posts Grid -->
	{#if posts && posts.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
			{#each posts as post}
				<div class="h-full">
					<BlogCard {post} />
				</div>
			{/each}
		</div>

		<!-- Pagination -->
		{#if pagination.totalPages > 1}
			<div class="flex justify-center items-center gap-4">
				<button
					class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={!pagination.hasPrevPage}
					on:click={() => goToPage(pagination.currentPage - 1)}
				>
					Previous
				</button>
				
				<span class="text-sm text-gray-600">
					Page {pagination.currentPage} of {pagination.totalPages}
				</span>
				
				<button
					class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={!pagination.hasNextPage}
					on:click={() => goToPage(pagination.currentPage + 1)}
				>
					Next
				</button>
			</div>
		{/if}
	{:else}
		<!-- Empty State -->
		<div class="text-center py-12">
			<Card class="max-w-md mx-auto">
				<CardContent class="pt-6">
					<div class="text-gray-500 mb-4">
						<svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
					<p class="text-gray-600 mb-4">
						{#if search}
							No posts match your search for "{search}". Try a different search term.
						{:else}
							We're working on creating great content for you. Check back soon!
						{/if}
					</p>
					{#if search}
						<button
							class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
							on:click={() => goto('/blog')}
						>
							Clear Search
						</button>
					{/if}
				</CardContent>
			</Card>
		</div>
	{/if}

		<!-- Search Section -->
	<div class="mb-8">
		<Card class="max-w-md mx-auto">
			<CardHeader>
				<CardTitle class="text-lg">Search Articles</CardTitle>
			</CardHeader>
			<CardContent>
				<form on:submit|preventDefault={handleSearch} class="flex gap-2">
					<input
						type="text"
						name="search"
						placeholder="Search blog posts..."
						value={search || ''}
						class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<Button type="submit">Search</Button>
				</form>
			</CardContent>
		</Card>
	</div>
</div>

<!-- Newsletter Section -->
<Newsletter />
