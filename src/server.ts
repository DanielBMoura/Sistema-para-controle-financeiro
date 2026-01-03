import Fastify from "fastify";
import cors from '@fastify/cors';
import { publicRoutes } from "./routes/publicRoutes.js";
import { privateRoutes } from "./routes/privateRoutes.js";
import 'dotenv/config'

const app = Fastify({ logger: true })

// Tratamento de erros
    app.setErrorHandler((error, request, reply) => {
        if (error instanceof Error) {
            return reply.status(400).send({ message: error.message })
        }

        return reply.status(500).send({ message: "Erro interno do servidor" })
    })


// Inicializar o servidor
    const start = async() => {
        await app.register(cors)
        await app.register(publicRoutes)
        await app.register(privateRoutes)

        try {
            await app.listen({ port: 3333 })
        } catch (err) {
            process.exit(1)
        }
    }

    start()