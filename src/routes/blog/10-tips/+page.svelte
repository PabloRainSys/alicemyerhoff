<script>
    import Latest from "$lib/components/sections/Latest.svelte";

    import { onMount } from "svelte";

    let blur = 0;
    let whiteOpacity = 0;

    onMount(() => {
        if (window.innerWidth < 768) return;

        const onScroll = () => {
            const scrollY = window.scrollY;

            blur = Math.min(scrollY / 20, 1000);
            whiteOpacity = Math.min(scrollY / 500, 100);
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    });
</script>

<!-- BACKGROUND FIJO -->
<div class="fixed inset-0 -z-10">
    <!-- Imagen -->
    <div
        class="absolute inset-0 bg-cover bg-center will-change-transform"
        style="
      background-image: url('/assets/alicemyerhoff/blog/10-tips/10-tips.jpg');
      filter: blur({blur}px);
      transform: scale(1.15);
    "
    ></div>

    <!-- Fade a blanco -->
    <div
        class="absolute inset-0 bg-white pointer-events-none"
        style="opacity: {whiteOpacity};"
    ></div>
</div>

<section
    class="pt-20 lg:pt-28 relative w-full h-[700px] md:h-[873px]
         overflow-hidden"
>
    <!-- Overlay -->
    <div class="absolute inset-0 bg-linear-to-b from-black/70"></div>

    <div
        class="relative w-full h-full flex items-center justify-center text-center text-white z-10"
    >
        <h1 class="w-10/12 md:w-1/2 text-3xl md:text-5xl font-circe font-bold">
            10 Tips for Getting Out of a Sales Slump
        </h1>
    </div>
</section>

<section class="relative w-full flex flex-col items-center pt-12">
    <div
        class="w-full px-6 md:px-0 md:w-[600px] flex flex-col items-start justify-start"
    >
        <p class="pb-4 text-light-gray text-sm">
            by Alice Myerhoff | Dec 19, 2014
        </p>
        <div class="w-full flex flex-row gap-2 pb-12">
            <p class="text-sm text-light-gray underline">Business</p>
            <p class="text-sm text-light-gray underline">|</p>
            <p class="text-sm text-light-gray underline">Sales</p>
            <p class="text-sm text-light-gray underline">|</p>
            <p class="text-sm text-light-gray underline">Finance</p>
        </div>
        <p class="text-base text-primary-gray pb-6">
            Sales is a roller coaster and one of the signs of a great
            salesperson is that they are able manage their moods through the
            highs and the lows that face all salespeople.
        </p>
        <p class="text-base text-primary-gray pb-6">
            LinkedIn is the most important platform for salespeople to master. I
            can’t even describe how huge my crush is on LinkedIn. There are a
            number of ways that salespeople can make great use of LinkedIn on a
            daily basis. Here are several strategies and tactics that you can
            put to use right away: 1. Research
        </p>
        <h2 class="text-2xl font-circe font-bold text-primary-gray pb-2">
            Tip 01
        </h2>

        <h3 class="text-lg font-circe font-bold text-primary-gray pb-6">
            Note: This post is a lightly modified excerpt from my book “Social
            Media for Salespeople“
        </h3>

        <p class="text-base text-primary-gray pb-6">
            If you are a salesperson or sales manager, like me, you are always
            on the prowl for ways to work more efficiently and thus generate
            more business. Below are 5 of my favorite tech tools that help me
            work smarter.
        </p>

        <p class="text-base text-primary-gray pb-6">
            Sales is a roller coaster and one of the signs of a great
            salesperson is that they are able manage their moods through the
            highs and the lows that face all salespeople.
        </p>

        <p class="text-base text-primary-gray pb-6">
            I can’t even describe how huge my crush is on LinkedIn. There are a
            number of ways that salespeople can make great use of LinkedIn on a
            daily basis. Here are several strategies and tactics that you can
            put to use right away: 1.
        </p>

        <h2 class="text-2xl font-circe font-bold text-primary-gray pb-2">
            Tip 02
        </h2>

        <h3 class="text-lg font-circe font-bold text-primary-gray pb-6">
            LinkedIn is the most important platform for salespeople to master.
        </h3>

        <p class="text-base text-primary-gray pb-20 border-b">
            Note: This post is a lightly modified excerpt from my book “Social
            Media for Salespeople“ If you are a salesperson or sales manager,
            like me, you are always on the prowl for ways to work more
            efficiently and thus generate more business. Below are 5 of my
            favorite tech tools that help me work smarter
        </p>
    </div>
</section>

<Latest />
