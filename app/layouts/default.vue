<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
        <header class="border-b bg-white">
            <nav class="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                <div class="flex items-center gap-6">
                    <NuxtLink to="/" class="font-semibold">titra</NuxtLink>

                    <div class="space-x-4 text-sm text-gray-700">
                        <NuxtLink to="/" class="hover:underline">Heute</NuxtLink>
                        <NuxtLink to="/times" class="hover:underline">Zeiten</NuxtLink>
                        <NuxtLink to="/reports" class="hover:underline">Reports</NuxtLink>
                    </div>
                </div>

                <!-- Right side: user + logout -->
                <div class="flex items-center gap-3">
                    <span v-if="session.loggedIn.value" class="text-sm text-gray-700">
                        {{ userEmail }}
                    </span>

                    <LogoutButton v-if="session.loggedIn.value" />
                    <NuxtLink
                        v-else
                        to="/login"
                        class="rounded bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                    >
                        Login
                    </NuxtLink>
                </div>
            </nav>
        </header>

        <main class="flex-1 mx-auto max-w-6xl w-full px-6 py-6">
            <slot></slot>
        </main>
    </div>
</template>

<script setup lang="ts">
const session = useUserSession()
await session.fetch()

const userEmail = computed(() => session.user.value?.email ?? '')
</script>
