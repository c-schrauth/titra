import argon2 from 'argon2'

type User = { 
    id: string; 
    email: string; 
    passwordHash: string
}

const users = new Map<string, User>() // key: email

export async function createUser(email: string, password: string) {
    const existing = users.get(email)
    if (existing)
        throw createError({ statusCode: 409, statusMessage: 'User exists' })

    const passwordHash = await argon2.hash(password)
    const user: User = {
        id: crypto.randomUUID(), 
        email, 
        passwordHash 
    }
    users.set(email, user)
  
    return { id: user.id, email: user.email }
}

export async function verifyUser(email: string, password: string) {
    const user = users.get(email)
    if (!user)
        return null
  
    const ok = await argon2.verify(user.passwordHash, password)
    if (!ok) 
        return null
  
    return { id: user.id, email: user.email }
}
