import type { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { userController } from "../controller/userController.js";
import { authController } from "../controller/authController.js";

export async function publicRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/', async(request: FastifyRequest, reply: FastifyReply) => {
        return { message: "Rota principal do projeto" }
    })

    fastify.post('/user', async(request: FastifyRequest, reply: FastifyReply) => {
        return new userController().createdUser(request, reply)
    })

    fastify.get('/login', async(request: FastifyRequest, reply: FastifyReply) => {
        return { message: "Tela de login" }
    })

    fastify.post('/authUser', async(request: FastifyRequest, reply: FastifyReply) => {
        return new authController().login(request, reply)
    })
}