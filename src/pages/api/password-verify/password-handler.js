import { compare, hash } from "bcryptjs";


// hash the password
export async function hashPassword(password) {
    return await hash(password, 12)
}

// compare if entered password is equal to the hashed one
export async function verifyPassword(password, hashedPassword) {
    return await compare(password, hashedPassword)
}
