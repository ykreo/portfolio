<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Contacts from '$lib/components/sections/Contacts.svelte';
	import CareerPath from '$lib/components/sections/CareerPath.svelte';
	import KeyProjects from '$lib/components/sections/KeyProjects.svelte';
	import MyArsenal from '$lib/components/sections/MyArsenal.svelte';
	import { scrollSpy } from '$lib/actions/scrollSpy';
</script>

<main>
		<Hero />
	<section id="careerpath" class="page-section" use:scrollSpy>
		<CareerPath />
	</section>

	<section id="keyprojects" class="page-section" use:scrollSpy>
		<KeyProjects />
	</section>

	<section id="myarsenal" class="page-section" use:scrollSpy>
		<MyArsenal />
	</section>

	<section id="about" class="page-section" use:scrollSpy>
		<About />
	</section>

	<section id="contacts" class="page-section bg-white/5" use:scrollSpy>
		<Contacts />
	</section>
</main>

<style>
	.page-section {
		padding: 6rem 0;
		min-height: 100vh;
	}
</style>