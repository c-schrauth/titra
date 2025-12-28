let interval: ReturnType<typeof setInterval> | null = null

export const useTimer = () => {
    // --- State ---
    const running = useState<boolean>('timer:running', () => false)
    const startedAt = useState<Date | null>('timer:startedAt', () => null)
    const elapsed = useState<number>('timer:elapsed', () => 0)

    // --- Actions ---
    const tick = () => {
        if (!startedAt.value)
            return
        elapsed.value = Math.floor((Date.now() - startedAt.value.getTime()) / 1000)
    }

    function start() {
        if (running.value)
            return
        if (!import.meta.client)
            return // start only in browser

        startedAt.value = new Date()
        tick()

        interval = setInterval(tick, 1000)
        running.value = true
    }

    function stop() {
        if (!import.meta.client)
            return

        if (interval) {
            clearInterval(interval)
            interval = null
        }
        running.value = false
    }

    function reset() {
        stop()
        startedAt.value = null
        elapsed.value = 0
    }

    function toggle() {
        console.debug("toggle pressed")
        running.value ? stop() : start()
    }

    // --- Formatted values
    const formatted = computed(() => {
        const h = Math.floor(elapsed.value / 3600)
        const m = Math.floor((elapsed.value % 3600) / 60)
        const s = elapsed.value % 60

        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    })

    // if user switches between pages: if running=true, save interval
    if (import.meta.client && running.value && !interval) {
        interval = setInterval(tick, 1000)
    }

    return {
        // state
        running,
        startedAt,
        elapsed,

        // computed
        formatted,

        // actions
        start,
        stop,
        toggle,
        reset
    }
}