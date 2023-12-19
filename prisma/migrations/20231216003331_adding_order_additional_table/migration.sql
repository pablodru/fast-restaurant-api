/*
  Warnings:

  - You are about to drop the column `additionalId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_additionalId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "additionalId",
DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "OrderAdditional" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "additionalId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderAdditional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "order_id_index" ON "OrderAdditional"("orderId");

-- CreateIndex
CREATE INDEX "additional_id_index" ON "OrderAdditional"("additionalId");

-- AddForeignKey
ALTER TABLE "OrderAdditional" ADD CONSTRAINT "OrderAdditional_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAdditional" ADD CONSTRAINT "OrderAdditional_additionalId_fkey" FOREIGN KEY ("additionalId") REFERENCES "Additional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
