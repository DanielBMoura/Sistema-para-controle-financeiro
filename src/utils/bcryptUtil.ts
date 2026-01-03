import bcrypt from "bcrypt";

const saltRounds = 10

async function passwordHash(password: string) {
    return await bcrypt.hash(password, saltRounds)
}

async function verifyPassword(passwordInput: string, passwordHash: string) {
    return await bcrypt.compare(passwordInput, passwordHash)
}

export { passwordHash, verifyPassword }