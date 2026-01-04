import { Prisma } from "@prisma/client"
import { prismaClient } from "../../lib/index.js"
import { transformDecimalUtil } from "../utils/transformDecimalUtil.js"

interface transactionServiceProps {
    idUser: string,
    idCategory: string,
    type: string,
    value: string,
    date: string,
    description: string
}

interface listTransactionProps {
    idUser: string
}

class transactionService {
    async listTransaction({idUser}: listTransactionProps){
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

    async createTransaction({idUser, idCategory, type, value, date, description}: transactionServiceProps) {
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

        const valueNumber = transformDecimalUtil(value)  // Converte "value" para o tipo decimal do prisma
        const dateCorrect = new Date(`${date}T00:00:00Z`)   // Adiciona o fuso horário

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
}

export { transactionService }