/*
  Warnings:

  - You are about to drop the column `vat` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `vat` on the `Orderline` table. All the data in the column will be lost.
  - You are about to drop the column `vatRateId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `VatRate` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_vatRateId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "vat";

-- AlterTable
ALTER TABLE "Orderline" DROP COLUMN "vat";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "vatRateId";

-- DropTable
DROP TABLE "VatRate";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
