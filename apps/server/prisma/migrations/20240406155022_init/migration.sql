/*
  Warnings:

  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - Added the required column `totalQuantity` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "price",
ADD COLUMN     "totalQuantity" INTEGER NOT NULL;
