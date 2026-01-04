import { Prisma } from "@prisma/client"

function transformDecimalUtil(value: string) {

    let newValue = value

    if (value.includes(',')) {
        newValue = value.replace(/\./g, '').replace(',', '.')
    } else {
        const partes = value.split('.') // Separa o valor em partes -> 1200.20 -> 1, 200, 20
        if (partes.length > 1) {   // Ve se tem pelo menos 1 pontos
            newValue = partes.slice(0, -1).join('') + '.' + partes.at(-1)
        }
    }


    return new Prisma.Decimal(newValue)
}

export { transformDecimalUtil }