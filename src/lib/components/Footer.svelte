<script lang="ts">
	import * as m from '$lib/paraglide/messages';
</script>

<footer class="footer">
	<div class="container">
		<p>
			&copy; {new Date().getFullYear()} YKREO.
			{@html m.footer_rights()}
		</p>
	</div>
</footer>

<style>
	.footer {
		padding: 2rem;
		text-align: center;
		background-color: rgba(255, 255, 255, 0.03);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		margin-top: 4rem;
	}
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		opacity: 0.7;
		font-size: 0.875rem;
	}
</style>