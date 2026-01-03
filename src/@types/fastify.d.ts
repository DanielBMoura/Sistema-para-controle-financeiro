// Arquivo de type do Back end, onde vai ser configurado informações sobre o fastify
import 'fastify'
import { prismaClient } from '../../lib/index.ts'

// Declaração de um módulo (Pode ser usado em qualquer lugar do código)
declare module "fastify" {
    interface FastifyRequest {   // O que eu quero sobreescrever
        user: PrismaClient.user  // Propriedade que eu vou criar e seu tipo
    }
}