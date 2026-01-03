import type { FastifyRequest, FastifyReply } from "fastify"
import jwt from "jsonwebtoken"
import { prismaClient } from "../../lib/index.js"

interface JwtPayload {
    id: string
}

async function getProfileMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const { authorization } = request.headers

    if (!authorization) {
        throw new Error("Usuário não logado")
    }

    // Transforma a string em um array. Cada espaço termina uma posição e começa outra, e pega sempre a posição [1]
    const token = authorization.split(" ")[1]

    // A função "verify" retorna o Id do usuário
    const { id } = jwt.verify(token!, process.env.JWT_PASS!) as JwtPayload  
    // Mostra para o typescript que o id existe, passando o tipo de "jwt", dizendo que ele tem o tipo JwtPayload que tem id como uma string

    const user = await prismaClient.user.findFirst({
        where: {
            idUser: id
        }
    })

    if(!user){
        throw new Error("Usuário não logado")
    }

    const { password:_, ...safeUser } = user

    request.user = safeUser

}

export { getProfileMiddleware }