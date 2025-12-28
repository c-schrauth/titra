import { verifyUser } from "~~/server/utils/users";

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody<{ email: string; password: string }>(event)

    const user = await verifyUser((email || '').toLowerCase(), password || '')
    if (!user) 
        throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })

    await setUserSession(event, { user })
  
    return { ok: true, user }
})
