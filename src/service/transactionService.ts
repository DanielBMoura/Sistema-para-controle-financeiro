import { Prisma } from "@prisma/client"
import { prismaClient } from "../../lib/index.js"
import { transformDecimalUtil } from "../utils/transformDecimalUtil.js"

interface UserContext {
    idUser: string
}

interface TransactionIndentifier {
    idTransaction: string
}

interface CreateTransaction extends UserContext {
    idCategory: string,
    type: string,
    value: string,
    date: string,
    description: string
}

interface UpdateTransaction extends CreateTransaction, TransactionIndentifier {}

class transactionService {
    async listTransaction({idUser}: UserContext){
        if (!idUser) {
            throw new Error("ERRO INTERNO")
        }

        const listTransaction = await prismaClient.transaction.findMany({
            where: {
                idUser
            }
        })

        return listTransaction
    }

    async createTransaction({idUser, idCategory, type, value, date, description}: CreateTransaction) {
        if (!idUser) {
            throw new Error("ERRO INTERNO")
        }

        if (type !== "DESPESA" && type !== "RECEITA") {
            throw new Error("ERRO INTERNO")
        }

        if (!idCategory || !type || !value || !date || !description) {
            throw new Error("Por favor, preencha todos os campos")
        }

        const categoryExist = await prismaClient.category.findFirst({
            where: {
                idCategory
            }
        })

        if (!categoryExist) {
            throw new Error("Categoria não encontrada")
        }

        const valueNumber = transformDecimalUtil(value)
        const dateCorrect = new Date(`${date}T00:00:00Z`)

        const createTransaction = await prismaClient.transaction.create({
            data: {
                idUser,
                idCategory,
                type,
                value: valueNumber,
                date: dateCorrect,
                description
            }
        })

        return createTransaction
    }

    async updateTransaction({ idTransaction, idUser, idCategory, type, value, date, description }: UpdateTransaction) {
        if (!idTransaction || !idUser) {
            throw new Error("ERRO INTERNO")
        }

        if (!idCategory || !type || !value || !date || !description) {
            throw new Error("Por favor, forneça todos os dados")
        }

        const transactionExist = await prismaClient.transaction.findFirst({
            where: {
                idTransaction,
                idUser
            }
        })

        if (!transactionExist) {
            throw new Error("Transação não encontrada")
        }

        const categoryExist = await prismaClient.category.findFirst({
            where: {
                idUser,
                idCategory
            }
        })

        if (!categoryExist) {
            throw new Error("Categoria não encontrada")
        }

        if (type !== "RECEITA" && type !== "DESPESA") {
            throw new Error("ERRO INTERNO")
        }

        const valueNumber = transformDecimalUtil(value)
        const dateCorrect = new Date(`${date}T00:00:00Z`)

        const updateTransaction = await prismaClient.transaction.update({
            where: {
                idTransaction,
                idUser
            },
            data: {
                idCategory,
                type,
                value: valueNumber,
                date: dateCorrect,
                description
            }
        })

        return updateTransaction

    }

    async deleteTransaction({idTransaction}: TransactionIndentifier, {idUser}: UserContext) {
        if (!idTransaction || !idUser) {
            throw new Error("ERRO INTERNO")
        }

        const transactionExist = await prismaClient.transaction.findFirst({
            where: {
                idTransaction,
                idUser
            }
        })

        if (!transactionExist) {
            throw new Error("Transação não encontrada")
        }

        const deleteTransaction = await prismaClient.transaction.delete({
            where: {
                idTransaction,
                idUser
            }
        })

        return deleteTransaction
    }
}

export { transactionService }