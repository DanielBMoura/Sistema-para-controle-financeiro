import type { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { getProfileMiddleware } from "../middlewares/getProfileMiddleware.js";
import { categoryController } from "../controller/categoryController.js";
import { transactionController } from "../controller/transactionController.js";

export async function privateRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.addHook("preHandler", getProfileMiddleware)

    fastify.get('/profile', async(request: FastifyRequest, reply: FastifyReply) => {
        return { 
            message: "Bem vindo!" ,
            user: {
                id: request.user.idUser,
                email: request.user.email,
                nome: request.user.name
            }
        }
    })

    fastify.get('/category', async(request: FastifyRequest, reply: FastifyReply) => {
        return new categoryController().listCategory(request, reply)
    })

    fastify.post('/category', async(request: FastifyRequest, reply: FastifyReply) => {
        return new categoryController().createCategory(request, reply)
    })

    fastify.patch('/category/:idCategory', async(request: FastifyRequest, reply: FastifyReply) => {
        return new categoryController().updateCategory(request, reply)
    })

    fastify.delete('/category/:idCategory', async(request: FastifyRequest, reply: FastifyReply) => {
        return new categoryController().deleteCategory(request, reply)
    })

    fastify.get('/transaction', async(request: FastifyRequest, reply: FastifyReply) => {
        return new transactionController().listTransaction(request, reply)
    })

    fastify.post('/transaction', async(request: FastifyRequest, reply: FastifyReply) => {
        return new transactionController().createTransaction(request, reply)
    })

    fastify.patch('/transaction/:idTransaction', async(request: FastifyRequest, reply: FastifyReply) => {
        return new transactionController().updateTransaction(request, reply)
    })

    fastify.delete('/transaction/:idTransaction', async(request: FastifyRequest, reply: FastifyReply) => {
        return new transactionController().deleteTransaction(request, reply)
    })
}