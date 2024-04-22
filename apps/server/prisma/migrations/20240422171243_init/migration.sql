-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brandId" INTEGER;

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seller" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSeller" (
    "productId" INTEGER NOT NULL,
    "sellerId" INTEGER NOT NULL,

    CONSTRAINT "ProductSeller_pkey" PRIMARY KEY ("sellerId","productId")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductColor" (
    "productId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,

    CONSTRAINT "ProductColor_pkey" PRIMARY KEY ("productId","colorId")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSeller" ADD CONSTRAINT "ProductSeller_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSeller" ADD CONSTRAINT "ProductSeller_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductColor" ADD CONSTRAINT "ProductColor_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductColor" ADD CONSTRAINT "ProductColor_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;
