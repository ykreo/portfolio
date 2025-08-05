<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { animateIn } from '$lib/actions/animateIn';
	import { scrollSpy } from '$lib/actions/scrollSpy';
	import { Mail, Send, Linkedin } from 'lucide-svelte';
</script>

<section id="contacts" use:scrollSpy>
	<div class="container" use:animateIn={{ y: 50 }}>
		<h2 class="section-title">
			{m.menu_contacts()}
		</h2>
		<p class="subtitle">
			{@html m.contacts_subtitle()}
		</p>
		<div class="contact-links">
			<a href="mailto:yarsam.work@gmail.com" class="contact-link" data-cursor-hover>
				<Mail size={24} />
				<span>Email</span>
			</a>
			<a href="https://t.me/ykreo" target="_blank" class="contact-link" data-cursor-hover>
				<Send size={24} />
				<span>Telegram</span>
			</a>
			<a
				href="https://www.linkedin.com/in/converticube"
				target="_blank"
				class="contact-link"
				data-cursor-hover
			>
				<Linkedin size={24} />
				<span>LinkedIn</span>
			</a>
		</div>
	</div>
</section>

<style>
	.container {
		max-width: 1000px;
		margin: 0 auto;
		padding: 5rem 2rem; /* Добавляем отступы секции */
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
		text-decoration: none;
		border-radius: 9999px;

		/* Используем стили из глобального класса .button */
		padding: 12px 24px;
		border: 1px solid var(--light-gray);
		background: linear-gradient(145deg, var(--dark-gray), #111);
		color: var(--white);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.contact-link:hover {
		transform: translateY(-2px) scale(1.05);
		box-shadow:
			0 4px 15px rgba(0, 0, 0, 0.3),
			0 0 15px var(--yellow-glow);
	}
</style>
