<template>
    <button
        type="button"
        @click="logout"
        class="inline-flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
        :disabled="loading"
    >
        <span v-if="!loading">Logout</span>
        <span v-else>Logout…</span>
    </button>
</template>

<script setup lang="ts">
const loading = ref(false)

async function logout() {
  if (loading.value)
    return
  loading.value = true

  try {
        await $fetch('/api/auth/logout', { method: 'POST' })

        const session = useUserSession()
        await session.clear()

        await navigateTo('/login')
    } catch (e) {
        console.error('Logout failed', e)
    } finally {
        loading.value = false
    }
}
</script>
