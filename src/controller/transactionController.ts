import type { FastifyReply, FastifyRequest } from "fastify";
import { transactionService } from "../service/transactionService.js";

class transactionController {
    async listTransaction(request: FastifyRequest, reply: FastifyReply) {
        const idUser = request.user.idUser

        const listTransaction = await new transactionService().listTransaction({ idUser })

        reply.send({ message: "Lista de transações", listTransaction })
    }

    async createTransaction(request: FastifyRequest, reply: FastifyReply) {
        const { 
            idCategory,
            type,
            value, 
            date, 
            description 
        } = request.body as {
            idCategory: string,
            type: string
            value: string,
            date: string,
            description: string
        }

        const idUser = request.user.idUser

        const newTransaction = await new transactionService().createTransaction({ idUser, idCategory, type, value, date, description })

        reply.send({ message: "Transação realizada com sucesso", newTransaction })

    }
}

export { transactionController }