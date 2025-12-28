export default defineNuxtRouteMiddleware(async (to) => {
    // These routes do not require authentication
    if (to.path === '/login' || to.path === '/register') 
        return
    
    if (import.meta.server)
        return

    const session = useUserSession()
    await session.fetch()

    if (!session.loggedIn.value) {
        return navigateTo('/login')
    }
})
