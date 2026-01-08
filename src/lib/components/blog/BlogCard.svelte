<script lang="ts">
	import type { WordPressPostWithMedia, WordPressCategory } from '$lib/types';
	import { wpUtils } from '$lib/wordpress/api';
	import { Badge } from '$lib/components/ui/badge';
	
	export let post: WordPressPostWithMedia | null = null;
	export let categories: Record<number, WordPressCategory> = {};

	// Format date
	function formatDate(dateString: string): string {
		return wpUtils.formatDate(dateString);
	}

	// Get excerpt
	function getExcerpt(content: string): string {
		return wpUtils.getExcerpt(content, 120);
	}
</script>

{#if post}
	<div class="bg-background-light h-full flex flex-col overflow-hidden rounded-lg">
		<!-- Clickable Image -->
		<a href="/blog/{post.slug}" class="block">
			{#if post.featured_media_data && post.featured_media_data.source_url}
				<div class="w-full h-48 overflow-hidden">
					<img
						src={post.featured_media_data.media_details?.sizes?.medium?.source_url || post.featured_media_data.source_url}
						alt={post.featured_media_data.alt_text || wpUtils.stripHtml(post.title.rendered)}
						class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
						loading="lazy"
					/>
				</div>
			{:else}
				<div class="w-full h-48 bg-gray-200 flex items-center justify-center">
					<svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
				</div>
			{/if}
		</a>

		<!-- Content -->
		<div class="flex flex-col flex-1 p-6">
			<!-- Category Badges -->
			{#if post.categories && post.categories.length > 0}
				<div class="flex flex-wrap gap-2 mb-3">
					{#each post.categories.slice(0, 3) as categoryId}
						{#if categories[categoryId]}
							<Badge class="bg-green-light text-white text-xs px-2 py-1 rounded-full">
								{categories[categoryId].name}
							</Badge>
						{/if}
					{/each}
					{#if post.categories.length > 3}
						<Badge class="bg-green-light text-white text-xs px-2 py-1 rounded-full">
							+{post.categories.length - 3} more
						</Badge>
					{/if}
				</div>
			{/if}

			<!-- Clickable Title -->
			<a href="/blog/{post.slug}" class="block mb-4">
				<h3 class="text-dark-main font-eastman font-bold text-2xl leading-8 tracking-normal hover:opacity-80 transition-opacity">
					{wpUtils.getSEOTitle(post.yoast_head_json, post.title.rendered)}
				</h3>
			</a>

			<!-- Description -->
			<p class="font-eastman font-normal text-base leading-[24px] tracking-normal text-dark-paragraph flex-1">
				{wpUtils.getSEODescription(post.yoast_head_json, post.excerpt.rendered, post.content.rendered)}
			</p>
		</div>
	</div>
{:else}
	<!-- Loading state -->
	<div class="bg-background-light h-full flex flex-col overflow-hidden rounded-lg">
		<div class="w-full h-48 bg-gray-200 animate-pulse"></div>
		<div class="flex flex-col flex-1 p-6">
			<div class="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
			<div class="space-y-2 flex-1">
				<div class="h-4 bg-gray-200 rounded animate-pulse"></div>
				<div class="h-4 bg-gray-200 rounded animate-pulse"></div>
				<div class="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
			</div>
		</div>
	</div>
{/if}
