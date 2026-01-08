<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
</script>



<div
    class="px-6 md:px-12 lg:px-32 flex flex-col gap-20 -translate-y-6 md:-translate-y-20"
>
    <div class="bg-light-yellow rounded-4xl p-12 md:p-20 lg:p-32">
        <h2 use:reveal={{ delay: 200 }}
        class="font-circe font-bold text-2xl text-primary-gray pb-6">
            One of my earliest memories
        </h2>
        <div use:reveal={{ delay: 300 }} class="w-full flex flex-col-reverse md:flex-row gap-12 pb-12">
            <div class="w-full md:w-9/12">
                <p class="text-base text-primary-gray pb-4">
                    of questioning rules was back in 5th or 6th grade when my
                    school in Turkey decided girls couldn’t wear shorts anymore.
                </p>
                <p class="text-base text-primary-gray pb-4">
                    My mom wasn’t having it. She sent me to school in shorts the
                    very next day, even though I was terrified of standing out
                    and getting in trouble. Sure enough, I ended up in the
                    principal’s office — but after my mom got involved, the rule
                    was dropped.
                </p>
                <p class="text-base text-primary-gray pb-4">
                    Looking back, I think that moment planted something in me:
                    the idea that rules aren’t always fair, and sometimes it
                    takes a little courage (and maybe some backup) to challenge
                    them.
                </p>
            </div>
            <div use:reveal={{ delay: 400 }} class="flex items-center md:items-start justify-center">
                <img
                    src="/assets/alicemyerhoff/home/turkey-flag.svg"
                    alt="Turkey Flag"
                    class="h-40 md:h-52"
                />
            </div>
        </div>
        <h2 use:reveal={{ delay: 200 }} class="font-circe font-bold text-2xl text-primary-gray pb-6">
            Life threw me some curveballs early on
        </h2>
        <div use:reveal={{ delay: 300 }} class="w-full flex flex-col-reverse md:flex-row gap-12 pb-12">
            <div class="w-full md:w-9/12">
                <p class="text-base text-primary-gray pb-4">
                    My mom passed away when I was 13, and from then on, I had to
                    figure out a lot on my own. It was a lonely time, but it
                    also made me independent and resilient in ways I didn’t
                    fully understand until much later.
                </p>
                <p class="text-base text-primary-gray pb-4">
                    I’ve always been curious and love trying new things. Over
                    the years I’ve gone from rowing and cycling across Zambia to
                    knitting, ultimate frisbee, yoga, tennis… you name it.
                </p>
                <p class="text-base text-primary-gray pb-4">
                    And I read constantly — usually a book a week. For me, books
                    and moving around a lot have taught me the same lesson:
                    there’s rarely just one perspective.
                </p>
                <p class="text-base text-primary-gray pb-4">
                    People see things differently, and there’s usually more than
                    one way to be right.
                </p>
                <p class="text-base text-primary-gray pb-4">
                    At the end of the day, I think that’s what defines me most —
                    curiosity, resilience, and an openness to different points
                    of view. It’s what shapes how I move through the world, and
                    I love connecting with people who feel the same way.
                </p>
            </div>
            <div use:reveal={{ delay: 400 }} class="flex items-center md:items-start justify-center">
                <img
                    src="/assets/alicemyerhoff/home/short.svg"
                    alt="Turkey Flag"
                    class="h-40 md:h-52"
                />
            </div>
        </div>
    </div>
</div>
