<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { animateIn } from '$lib/actions/animateIn';
	import { Mail, Send, Linkedin } from 'lucide-svelte';
</script>

<div class="container">
	<h2 class="section-title" use:animateIn>{m.menu_contacts()}</h2>
	<p class="subtitle" use:animateIn={{ from: { y: 30, opacity: 0, delay: 0.1 } }}>
		{@html m.contacts_subtitle()}
	</p>
	<div class="contact-links" use:animateIn={{ from: { y: 30, opacity: 0, delay: 0.2 } }}>
		<a href="yarsam.work@gmail.com" class="contact-link" data-cursor-hover>
			<Mail size={24} />
			<span>Email</span>
		</a>
		<a href="https://t.me/ykreo" target="_blank" class="contact-link" data-cursor-hover>
			<Send size={24} />
			<span>Telegram</span>
		</a>
		<a href="https://www.linkedin.com/in/converticube" target="_blank" class="contact-link" data-cursor-hover>
			<Linkedin size={24} />
			<span>LinkedIn</span>
		</a>
	</div>
</div>

<style>
	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 2rem;
		text-align: center;
	}
	.section-title {
		font-size: clamp(2.5rem, 8vw, 3rem);
		font-weight: 700;
		margin-bottom: 1.5rem;
	}
	.subtitle {
		font-size: clamp(1rem, 4vw, 1.125rem);
		opacity: 0.8;
		max-width: 600px;
		margin: 0 auto 3rem;
	}
	.contact-links {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1.5rem;
	}
	.contact-link {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background-color: transparent;
		color: var(--color-text);
		border-radius: 9999px;
		text-decoration: none;
		transition: all 0.2s ease;
	}
	.contact-link:hover {
		background-color: var(--color-accent);
		color: var(--color-background);
		border-color: var(--color-accent);
		transform: translateY(-2px);
	}
</style>