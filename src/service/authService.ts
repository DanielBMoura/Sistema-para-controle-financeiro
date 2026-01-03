import { prismaClient } from '../../lib/index.js'
import { verifyPassword } from '../utils/bcryptUtil.js'
import jwt from 'jsonwebtoken'

interface authControllerProps {
    email: string,
    password: string
}

class authService {
    async login({email, password}: authControllerProps) {
        if (!email || !password) {
            throw new Error("Por favor, preencha todos os campos.")
        }

        const user = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }
        
        const passwordCompare = await verifyPassword(password, user.password)

        if (!passwordCompare) {
            throw new Error("Email ou senha incorretos")
        }

        const token = jwt.sign(
            { id: user.idUser },
            process.env.JWT_PASS!,
            { expiresIn: '1d' }
        )

        return { user, token }
    }
}

export { authService }