-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "maxQuantity" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Size" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSize" (
    "productId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,

    CONSTRAINT "ProductSize_pkey" PRIMARY KEY ("productId","sizeId")
);

-- AddForeignKey
ALTER TABLE "ProductSize" ADD CONSTRAINT "ProductSize_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSize" ADD CONSTRAINT "ProductSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE CASCADE ON UPDATE CASCADE;
