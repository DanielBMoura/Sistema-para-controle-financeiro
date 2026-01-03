import type { FastifyRequest, FastifyReply } from "fastify";
import { authService } from "../service/authService.js";

class authController {
    async login(request: FastifyRequest, reply: FastifyReply) {
        const { 
            email, 
            password 
        } = request.body as {
            email: string,
            password: string
        }

        const authUser = await new authService().login({email, password})

        reply.send({ message: "Usuário logado com sucesso", authUser })
    }
}

export { authController }