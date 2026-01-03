import { prismaClient } from "../../lib/index.js"

interface UserContext {
    idUser: string
}

interface CategoryIndentifier {
    idCategory: string
}

interface CreateCategory extends UserContext {
    name: string
}

interface UpdateCategory extends UserContext, CategoryIndentifier {
    name: string
}

interface DeleteCategoy extends CategoryIndentifier, UserContext {}

class categoryService {

    async listCategory({ idUser }: UserContext){
        if (!idUser) {
            throw new Error("ERRO INTERNO")
        }

        const listCategory = await prismaClient.category.findMany({
            where: {
                idUser
            }
        })

        return listCategory
    }

    async createCategory({idUser, name}: CreateCategory) {
        if (!name) {
            throw new Error("Por favor, preencha todos os campos.")
        }

        const categoryExist = await prismaClient.category.findFirst({
            where: {
                name
            }
        })

        if (categoryExist) {
            throw new Error("Categoria já existente")
        }

        const createCategory = await prismaClient.category.create({
            data: {
                idUser,
                name
            }
        })

        return createCategory
    }

    async updateCategory({ idCategory, idUser, name }: UpdateCategory) {
        if (!idCategory || !idUser) {
            throw new Error("ERRO INTERNO")
        }

        if (!name) {
            throw new Error("Por favor, preencha os compos para realizar atualização")
        }

        const category = await prismaClient.category.findFirst({
            where: {
                idCategory,
                idUser
            }
        })

        if (!category) {
            throw new Error("Categoria não encontrada")
        }

        const updateCategory = await prismaClient.category.update({
            where: {
                idCategory,
                idUser
            },
            data: {
                name
            }
        })

        return updateCategory
    }

    async deleteCategory({idCategory, idUser}: DeleteCategoy){
        if (!idCategory || !idUser) {
            throw new Error("ERRO INTERNO")
        }

        const categoryExist = await prismaClient.category.findFirst({
            where: {
                idCategory,
                idUser
            }
        })

        if (!categoryExist) {
            throw new Error("Categoria não encontrada")
        }

        const deleteCategory = await prismaClient.category.delete({
            where: {
                idCategory,
                idUser
            }
        })

        return deleteCategory
    }
}

export { categoryService }