<template>
    <div class="min-h-screen flex flex-col bg-gray-500">
        <header class="border-b bg-white">
            <nav class="mx-auto max-w-6xl px-6 py-4 flex justify-between">
                <span class="font-semibold">Arbeitszeit</span>
                <div class="space-x-4 text-sm">
                    <NuxtLink to="/">Heute</NuxtLink>
                    <NuxtLink to="/times">Zeiten</NuxtLink>
                    <NuxtLink to="/reports">Reporte</NuxtLink>
                </div>
            </nav>
        </header>

        <main class="flex-1 mx-auto max-w-6xl w-full px-6 py-6">
            <slot></slot>
        </main>
    </div>
</template>

<script setup>
//definePageMeta({ layout: 'default' })
</script>