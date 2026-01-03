import type { FastifyRequest, FastifyReply } from "fastify";
import { userService } from "../service/userServices.js";

class userController {

    async createdUser(request: FastifyRequest, reply: FastifyReply) {

        const {
            name, 
            email, 
            password,
            confirmPassword 
        } = request.body as {
            name: string, 
            email: string, 
            password: string, 
            confirmPassword: string
        }

        const createdUser = await new userService().createdUser({name, email, password, confirmPassword})

        reply.send({ message: "Usuário criado com sucesso", createdUser }) 

    }

}

export { userController }