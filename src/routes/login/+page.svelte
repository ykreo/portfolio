<script lang="ts">
    import { enhance } from '$app/forms';
    import * as m from '$lib/paraglide/messages';

    let { form } = $props();
</script>

<div class="login-container">
    <div class="login-form">
        <h1 class="title">{m.login_title()}</h1>
        <form method="POST" use:enhance>
            <label for="password">{m.login_password_label()}</label>
            <input type="password" name="password" id="password" required />

            {#if form?.error}
                <p class="error">{form.error}</p>
            {/if}

            <button type="submit" data-cursor-hover>{m.login_button()}</button>
        </form>
    </div>
</div>

<style>
    .login-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-background);
    }
    .login-form {
        width: 100%;
        max-width: 350px;
        padding: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 0.5rem;
        background-color: rgba(255, 255, 255, 0.03);
    }
    .title {
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }
    label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        opacity: 0.8;
    }
    input {
        width: 100%;
        padding: 0.75rem;
        border-radius: 0.25rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(0, 0, 0, 0.2);
        color: var(--color-text);
        margin-bottom: 1.5rem;
    }
    input:focus {
        outline: none;
        border-color: var(--color-accent);
    }
    button {
        width: 100%;
        padding: 0.75rem;
        border: none;
        border-radius: 0.25rem;
        background-color: var(--color-accent);
        color: var(--color-background);
        font-weight: 700;
        cursor: pointer;
        transition: opacity 0.2s ease;
    }
    button:hover {
        opacity: 0.9;
    }
    .error {
        color: #ef4444; /* red-500 */
        font-size: 0.875rem;
        text-align: center;
        margin-bottom: 1.5rem;
        margin-top: -0.5rem;
    }
</style>