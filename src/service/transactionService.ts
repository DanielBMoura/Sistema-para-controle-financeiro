interface transactionServiceProps {
    idUser: string,
    value: string,
    idCategory: string,
    date: string,
    description: string
}

class transactionService {
    async createTransaction({idUser, value, idCategory, date, description}: transactionServiceProps) {
        console.log({idUser, value, idCategory, date, description})
    }
}

export { transactionService }