<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { Linkedin, Send, Mail } from 'lucide-svelte';
</script>

<footer class="footer">
	<div class="container">
		<p class="copyright">
			&copy; {new Date().getFullYear()} YKREO.
			{@html m.footer_rights()}
		</p>
		<div class="social-links">
			<a
				href="mailto:yarsam.work@gmail.com"
				aria-label="Email"
				target="_blank"
				rel="noopener noreferrer"
				data-cursor-hover
			>
				<Mail size={20} />
			</a>
			<a
				href="https://t.me/ykreo"
				aria-label="Telegram"
				target="_blank"
				rel="noopener noreferrer"
				data-cursor-hover
			>
				<Send size={20} />
			</a>
			<a
				href="https://www.linkedin.com/in/converticube"
				aria-label="LinkedIn"
				target="_blank"
				rel="noopener noreferrer"
				data-cursor-hover
			>
				<Linkedin size={20} />
			</a>
		</div>
	</div>
</footer>

<style>
	.footer {
		padding: 3rem 2rem;
		text-align: center;

		/* Используем наши переменные для единого стиля */
		background-color: var(--dark-gray);
		border-top: 1px solid var(--light-gray);
	}
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}
	.copyright {
		opacity: 0.7;
		font-size: 0.9rem;
		margin-bottom: 1.5rem;
	}
	.social-links {
		display: flex;
		justify-content: center;
		gap: 2rem;
	}
	.social-links a {
		color: var(--color-text);
		opacity: 0.7;
		transition:
			color 0.3s ease,
			opacity 0.3s ease,
			transform 0.3s ease;
	}
	.social-links a:hover {
		color: var(--yellow);
		opacity: 1;
		transform: scale(1.1);
	}
</style>
