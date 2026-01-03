import type { FastifyReply, FastifyRequest } from "fastify";
import { categoryService } from "../service/categoryService.js";

class categoryController {
    async listCategory(request: FastifyRequest, reply: FastifyReply) {
        const idUser = request.user.idUser

        const listCategory = await new categoryService().listCategory({ idUser })

        reply.send({ message: "Lista de categoria: ", listCategory })
    }

    async createCategory(request: FastifyRequest, reply: FastifyReply) {
        const { name } = request.body as { name: string }
        const idUser = request.user.idUser

        const newCategory = await new categoryService().createCategory({ idUser, name })

        reply.send({ message: "Categoria criada com sucesso", newCategory })
    }

    async updateCategory(request: FastifyRequest, reply: FastifyReply) {
        const { idCategory } = request.params as { idCategory: string }
        const { name } = request.body as { name: string }
        const idUser = request.user.idUser

        const updateCategory = await new categoryService().updateCategory({ idCategory, name, idUser })

        reply.send({ message: "Categoria editada com sucesso", updateCategory })
    }

    async deleteCategory(request: FastifyRequest, reply: FastifyReply) {
        const { idCategory } = request.params as { idCategory: string }
        const idUser = request.user.idUser

        const deleteCategory = await new categoryService().deleteCategory({ idCategory, idUser })

        reply.send({ message: "Categoria deletada com sucesso", deleteCategory })
    }
}

export { categoryController }