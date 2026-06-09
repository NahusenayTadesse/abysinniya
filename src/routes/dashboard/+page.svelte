<script lang="ts">
	import ContactMessages from './contact.svelte';

	let { data } = $props();

	const messages = $derived(data?.leads);
</script>

{#key messages}
	<ContactMessages readForm={data?.readForm} deleteForm={data?.deleteForm} {messages} />
{/key}
