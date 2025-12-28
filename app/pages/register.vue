<template>
    <div class="mx-auto mt-16 max-w-sm space-y-5">
        <div class="space-y-1">
            <h1 class="text-2xl font-bold">Account erstellen</h1>
            <p class="text-sm text-gray-600">Registriere dich mit E-Mail & Passwort.</p>
        </div>

        <div class="space-y-3">
            <label class="block text-sm font-medium">E-Mail</label>
            <input
                v-model="email"
                type="email"
                autocomplete="email"
                class="w-full rounded border bg-white px-3 py-2"
                placeholder="du@beispiel.de"
            />

            <label class="block text-sm font-medium">Passwort</label>
            <input
                v-model="password"
                type="password"
                autocomplete="new-password"
                class="w-full rounded border bg-white px-3 py-2"
                placeholder="mind. 8 Zeichen"
            />

            <label class="block text-sm font-medium">Passwort wiederholen</label>
            <input
                v-model="confirmPassword"
                type="password"
                autocomplete="new-password"
                class="w-full rounded border bg-white px-3 py-2"
                placeholder="Passwort erneut eingeben"
            />

            <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

            <button
                type="button"
                class="w-full rounded bg-black py-2 font-semibold text-white disabled:opacity-60"
                :disabled="loading"
                @click="register"
            >
                {{ loading ? 'Erstelle Account…' : 'Registrieren' }}
            </button>
        </div>

        <p class="text-sm text-gray-600">
            Schon registriert?
            <NuxtLink to="/login" class="font-medium text-black underline">
                Zum Login
            </NuxtLink>
        </p>
    </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

async function register() {
    error.value = ''

    const e = email.value.trim()
    const p = password.value
    const c = confirmPassword.value

    if (!e) {
        error.value = 'Bitte gib eine E-Mail-Adresse ein.'
        return
    }
    if (p.length < 8) {
        error.value = 'Das Passwort muss mindestens 8 Zeichen lang sein.'
        return
    }
    if (p !== c) {
        error.value = 'Passwörter stimmen nicht überein.'
        return
    }

    loading.value = true
    try {
        await $fetch('/api/auth/register', {
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
            'Registrierung fehlgeschlagen.'
    } finally {
        loading.value = false
    }
}
</script>
