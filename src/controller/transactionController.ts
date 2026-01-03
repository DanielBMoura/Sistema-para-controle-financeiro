import type { FastifyReply, FastifyRequest } from "fastify";
import { transactionService } from "../service/transactionService.js";

class transactionController {
    async createTransaction(request: FastifyRequest, reply: FastifyReply) {
        const { 
            value, 
            idCategory,
            date, 
            description 
        } = request.body as {
            value: string,
            idCategory: string,
            date: string,
            description: string
        }

        const idUser = request.user.idUser

        const newTransaction = new transactionService().createTransaction({ idUser, value, idCategory, date, description })

        reply.send({ message: "Transação realizada com sucesso", newTransaction })

    }
}

export { transactionController }