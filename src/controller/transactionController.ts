import type { FastifyReply, FastifyRequest } from "fastify";
import { transactionService } from "../service/transactionService.js";

interface transactionProps {
    idCategory: string,
    type: string
    value: string,
    date: string,
    description: string
}

class transactionController {
    async listTransaction(request: FastifyRequest, reply: FastifyReply) {
        const idUser = request.user.idUser

        const listTransaction = await new transactionService().listTransaction({ idUser })

        reply.send({ message: "Lista de transações", listTransaction })
    }

    async createTransaction(request: FastifyRequest, reply: FastifyReply) {
        const { idCategory, type, value, date, description } = request.body as transactionProps

        const idUser = request.user.idUser

        const newTransaction = await new transactionService().createTransaction({ idUser, idCategory, type, value, date, description })

        reply.send({ message: "Transação realizada com sucesso", newTransaction })
    }

    async updateTransaction(request: FastifyRequest, reply: FastifyReply) {
        const { idTransaction } = request.params as { idTransaction: string }
        const idUser = request.user.idUser
        const { idCategory, type, value, date, description } = request.body as transactionProps

        const updateTransaction = await new transactionService().updateTransaction({ idTransaction, idUser, idCategory, type, value, date, description })

        reply.send({ message: "Atualização realizada com sucesso", updateTransaction })
    }

    async deleteTransaction(request: FastifyRequest, reply: FastifyReply) {
        const { idTransaction } = request.params as { idTransaction: string }
        const idUser = request.user.idUser

        const deleteTransaction = await new transactionService().deleteTransaction({ idTransaction }, { idUser })

        reply.send({ message: "Transação deletada com sucesso", deleteTransaction })
    }
}

export { transactionController }