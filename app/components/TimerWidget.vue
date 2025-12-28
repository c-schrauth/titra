<template>
    <div class="rounded-lg border bg-white p-7 max-w-sm">
        <div class="text-4xl font-mono text-center">{{ formatted }}</div>

        <button
            @click="toggle"
            class="mt-7 w-full rounded py-4 font-semibold text-white"
            :class="running ? 'bg-red-600' : 'bg-green-600'"
        >
            {{ running ? 'Stop' : 'Start' }}
        </button>
    </div>
</template>

<script setup lang="ts">
const { running, formatted, toggle } = useTimer()
</script>