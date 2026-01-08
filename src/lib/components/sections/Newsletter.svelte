<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';
	
	let email = '';
	let isSubmitting = false;
	let message = '';
	let messageType: 'success' | 'error' | '' = '';
	let recaptchaLoaded = false;
	let grecaptcha: any;

	onMount(() => {
		// Load reCAPTCHA script
		if (PUBLIC_RECAPTCHA_SITE_KEY) {
			const script = document.createElement('script');
			script.src = 'https://www.google.com/recaptcha/api.js';
			script.async = true;
			script.defer = true;
			script.onload = () => {
				recaptchaLoaded = true;
				grecaptcha = (window as any).grecaptcha;
			};
			document.head.appendChild(script);
		}
	});

	async function handleSubmit(event: Event) {
		event.preventDefault();
		
		if (isSubmitting) return;
		
		// Reset message
		message = '';
		messageType = '';
		
		// Validate email
		if (!email.trim()) {
			message = 'Please enter your email address';
			messageType = 'error';
			return;
		}

		isSubmitting = true;

		try {
			let recaptchaToken = '';
			
			// Get reCAPTCHA token if available
			if (recaptchaLoaded && grecaptcha && PUBLIC_RECAPTCHA_SITE_KEY) {
				try {
					recaptchaToken = await grecaptcha.execute(PUBLIC_RECAPTCHA_SITE_KEY, { action: 'newsletter_subscribe' });
				} catch (recaptchaError) {
					console.warn('reCAPTCHA failed:', recaptchaError);
					// Continue without reCAPTCHA if it fails
				}
			}

			// Submit to API
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ 
					email: email.trim(),
					recaptchaToken 
				}),
			});

			const result = await response.json();

			if (result.success) {
				message = result.message || 'Successfully subscribed to newsletter!';
				messageType = 'success';
				email = ''; // Reset form
			} else {
				message = result.error || 'Failed to subscribe. Please try again.';
				messageType = 'error';
			}

		} catch (error) {
			console.error('Newsletter subscription error:', error);
			message = 'Network error. Please check your connection and try again.';
			messageType = 'error';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<section class="py-24 bg-green-light">
	<div class="mx-auto px-4 max-w-none lg:px-16 lg:max-w-7xl">
		<div class="flex flex-col lg:flex-row gap-8 lg:gap-0 items-center justify-center">
			<!-- Left Side -->
			<div class="flex flex-col justify-center h-full lg:pr-8 lg:border-r border-background-light lg:max-w-[465px]">
				<h2 class="font-eastman font-bold text-4xl leading-10 tracking-normal text-center lg:text-right text-background-light mb-6">
					Join Our Newsletter
				</h2>
				<p class="font-eastman font-normal text-base leading-[24px] tracking-normal text-background-light text-center lg:text-right">
					Sign up for our quarterly newsletter for sales strategies, industry trends and other useful information.
				</p>
			</div>

			<!-- Right Side -->
			<div class="flex flex-col justify-center lg:pl-8 lg:w-full lg:max-w-[460px]">
				<form on:submit={handleSubmit} class="space-y-4 w-full">
					<div class="w-full">
						<label for="email" class="block font-eastman font-normal text-base leading-[24px] tracking-normal text-background-light mb-2">
							Email
						</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							required
							class="w-full px-4 py-3 rounded-md border border-green-main bg-white text-dark-main font-eastman font-normal text-base leading-[24px] tracking-normal hover:border-dark-main focus:outline-none focus:ring-2 focus:ring-oscuro-hover focus:border-oscuro-hover transition-colors"
							placeholder="Enter your email address"
						/>
					</div>
					<Button 
						type="submit" 
						variant="default" 
						size="lg" 
						class="w-full lg:w-auto"
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Subscribing...' : 'Subscribe'}
					</Button>
					
					<!-- Message Display -->
					{#if message}
						<div class="mt-4 p-3 rounded-md {messageType === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}">
							<p class="font-eastman font-normal text-sm leading-[20px] tracking-normal">
								{message}
							</p>
						</div>
					{/if}
				</form>
			</div>
		</div>
	</div>
</section>
