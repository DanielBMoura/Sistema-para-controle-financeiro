import { prismaClient } from "../../lib/index.js";
import { passwordHash } from "../utils/bcryptUtil.js"

interface UserProps {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

class userService {

    async createdUser({name, email, password, confirmPassword}: UserProps) {

        if (!name || !email || !password || !confirmPassword) {
            throw new Error("Por favor, envie todos os dados.")
        }

        if (confirmPassword !== password) {
            throw new Error("Por favor, coloque senha e confirmar Senha iguais.")
        }

        const emailExisting = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (emailExisting) {
            throw new Error("Usuário já cadastrado.")
        }

        const passwordHashed = await passwordHash(password)
        
        const createdUser = await prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHashed
            }
        })

        return createdUser

    }

}

export { userService }