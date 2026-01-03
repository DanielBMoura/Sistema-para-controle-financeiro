-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('RECEITA', 'DESPESA');

-- CreateTable
CREATE TABLE "categories" (
    "idCategory" UUID NOT NULL,
    "idUser" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("idCategory")
);

-- CreateTable
CREATE TABLE "transactions" (
    "idTransaction" UUID NOT NULL,
    "idUser" UUID NOT NULL,
    "idCategory" UUID NOT NULL,
    "type" "TransactionType" NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "date" DATE NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("idTransaction")
);

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("idUser") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "categories"("idCategory") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("idUser") ON DELETE CASCADE ON UPDATE CASCADE;
