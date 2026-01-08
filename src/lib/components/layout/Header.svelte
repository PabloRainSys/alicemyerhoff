<script lang="ts">
    import { page } from "$app/stores";
    import { siteConfig, mainNav, serviceLinks } from "$lib/config/site";
    import { Menu, Calendar } from "lucide-svelte";
    import * as Sheet from "$lib/components/ui/sheet";
    import { Button } from "$lib/components/ui/button";

    let mobileMenuOpen = false;

    function closeMobileMenu() {
        mobileMenuOpen = false;
    }
</script>

<div
    class="fixed z-50 w-full h-20 lg:h-28 bg-primary-gray px-6 md:px-12 lg:px-32 flex flex-row justify-between items-center"
>
    <div>
        <a href="/"
            ><img
                src="/assets/alicemyerhoff/logo.svg"
                class="h-8 lg:h-12"
                alt="Alice Myerhoff Logo"
            /></a
        >
    </div>
    <div class="hidden lg:flex flex-row gap-6">
        <nav class="w-full flex flex-row gap-6 items-center justify-end">

            {#each mainNav as item}
				<a
					href={item.href}
					class="text-base text-white leading-6 tracking-normal transition-colors {$page.url.pathname === item.href ? 'font-bold' : 'font-normal hover:text-primary-yellow'}"
				>
					{item.title}
				</a>
			{/each}
            
            
            <div class="w-6 h-6">
                <img
                    src="/assets/alicemyerhoff/iconsearch.svg"
                    class="w-6 h-6"
                    alt="Search"
                />
            </div>
        </nav>
        <div class="flex flex-row w-full items-center justify-end">
            <div
                class="flex flex-row items-center gap-4 rounded-full pl-8 py-1.5 pr-1.5 bg-primary-yellow hover:bg-secondary-yellow cursor-pointer transition"
            >
                <p class="text-base text-white font-bold">Book a call</p>
                <div
                    class="flex items-center justify-center w-9 h-9 rounded-full bg-white"
                >
                    <img
                        src="/assets/alicemyerhoff/iconcalendar.svg"
                        alt="Calendar"
                        class="w-6 h-6"
                    />
                </div>
            </div>
        </div>
    </div>

    <!-- Mobile Menu Sheet -->
    <div class="lg:hidden ml-auto">
        <Sheet.Root bind:open={mobileMenuOpen}>
            <Sheet.Trigger
                class="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-white hover:bg-dark-gray"
            >
                <Menu class="h-6 w-6" />
                <span class="sr-only">Toggle mobile menu</span>
            </Sheet.Trigger>
            <Sheet.Content
                side="right"
                class="border-none w-80 bg-primary-gray"
            >
                <nav class="flex flex-col mt-12 px-8">
                    {#each mainNav as item}
                        <a
                            href={item.href}
                            class="block py-6 mx-[-32px] px-8 text-base leading-6  tracking-normal transition-colors {$page
                                .url.pathname === item.href
                                ? 'text-white font-bold bg-dark-gray'
                                : 'font-normal text-white hover:bg-dark-gray/50'}"
                            onclick={closeMobileMenu}
                        >
                            {item.title}
                            {#if item.description}
                                <div
                                    class="text-xs leading-5 font-normal mt-1 text-light-gray"
                                >
                                    {item.description}
                                </div>
                            {/if}
                        </a>
                    {/each}
                    <div
                        class="flex flex-row items-center justify-between gap-4 rounded-full mt-4 pl-6 py-1.5 pr-1.5 bg-primary-yellow hover:bg-secondary-yellow cursor-pointer transition"
                    >
                        <p class="text-base text-white font-bold">
                            Book a call
                        </p>
                        <div
                            class="flex items-center justify-center w-9 h-9 rounded-full bg-white"
                        >
                            <img
                                src="/assets/alicemyerhoff/iconcalendar.svg"
                                alt="Calendar"
                                class="w-6 h-6"
                            />
                        </div>
                    </div>
                    
                </nav>
            </Sheet.Content>
        </Sheet.Root>
    </div>
</div>
