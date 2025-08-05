<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Contacts from '$lib/components/sections/Contacts.svelte';
	import CareerPath from '$lib/components/sections/CareerPath.svelte';
	import KeyProjects from '$lib/components/sections/KeyProjects.svelte';
	import MyArsenal from '$lib/components/sections/MyArsenal.svelte';
	import { scrollSpy } from '$lib/actions/scrollSpy';
</script>

<main use:scrollSpy>
	<Hero />

	<section id="about" class="page-section">
		<About />
	</section>

	<section id="careerpath" class="page-section">
		<CareerPath />
	</section>

	<section id="keyprojects" class="page-section">
		<KeyProjects />
	</section>

	<section id="myarsenal" class="page-section">
		<MyArsenal />
	</section>

	<section id="contacts" class="page-section">
		<Contacts />
	</section>
</main>

<style>
	.page-section {
		padding: 6rem 0;
	}
</style>
