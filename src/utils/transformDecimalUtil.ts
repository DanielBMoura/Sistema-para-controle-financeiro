import { Prisma } from "@prisma/client"

function transformDecimalUtil(value: string) {

    let newValue = value

    if (value.includes(',')) {
        newValue = value.replace(/\./g, '').replace(',', '.')
    } else {
        const partes = value.split('.')
        if (partes.length > 1) {
            newValue = partes.slice(0, -1).join('') + '.' + partes.at(-1)
        }
    }


    return new Prisma.Decimal(newValue)
}

export { transformDecimalUtil }