<template>
    <div class="mx-auto mt-16 max-w-sm space-y-5">
        <div class="space-y-1">
            <h1 class="text-2xl font-bold">Login</h1>
            <p class="text-sm text-gray-600">Melde dich bei titra an.</p>
        </div>

        <div class="space-y-3">
            <label class="block text-sm font-medium">E-Mail</label>
            <input
                v-model="email"
                type="email"
                autocomplete="email"
                class="w-full rounded border bg-white px-3 py-2"
                placeholder="du@beispiel.de"
                @keyup.enter="login"
            />

            <label class="block text-sm font-medium">Passwort</label>
            <input
                v-model="password"
                type="password"
                autocomplete="current-password"
                class="w-full rounded border bg-white px-3 py-2"
                placeholder="Dein Passwort"
                @keyup.enter="login"
            />

            <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

            <button
                type="button"
                class="w-full rounded bg-black py-2 font-semibold text-white disabled:opacity-60"
                :disabled="loading"
                @click="login"
            >
                {{ loading ? 'Login…' : 'Einloggen' }}
            </button>
        </div>

        <p class="text-sm text-gray-600">
            Noch keinen Account?
            <NuxtLink to="/register" class="font-medium text-black underline">
                Jetzt registrieren
            </NuxtLink>
        </p>
    </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function login() {
    error.value = ''

    const e = email.value.trim()
    const p = password.value

    if (!e) {
        error.value = 'Bitte gib eine E-Mail-Adresse ein.'
        return
    }
    if (!p) {
        error.value = 'Bitte gib dein Passwort ein.'
        return
    }

    loading.value = true
    try {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: { email: e, password: p },
        })

        // Optional: Update session status in client
        const session = useUserSession()
        await session.fetch()
        
        await navigateTo('/')
    } catch (err: any) {
        error.value =
            err?.data?.statusMessage ||
            err?.statusMessage ||
            'Login fehlgeschlagen.'
    } finally {
        loading.value = false
    }
}
</script>
