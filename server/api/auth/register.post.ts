import { createUser } from "~~/server/utils/users";

export default defineEventHandler(async (event) => {
    const { email, password } = await readBody<{ email: string; password: string }>(event)

    if (!email || !password || password.length < 8) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid email/password' })
    }

    const user = await createUser(email.toLowerCase(), password)

    // Set session
    await setUserSession(event, { user })

    return { ok: true, user }
})
