const { PrismaClient } = require('@prisma/client');
const address = require('./seeds/address.ts');
const admin = require('./seeds/admin.ts');
const country = require('./seeds/country.ts');
const extraCostType = require('./seeds/extra-cost-type.ts');
const extraCost = require('./seeds/extra-cost.ts');
const order = require('./seeds/order.ts');
const orderline = require('./seeds/orderline.ts');
const productType = require('./seeds/product-type.ts');
const product = require('./seeds/product.ts');
const shoppingCartProduct = require('./seeds/shopping-cart-product.ts');
const user = require('./seeds/user.ts');

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.address.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.country.deleteMany();
  await prisma.extraCostType.deleteMany();
  await prisma.extraCost.deleteMany();
  await prisma.order.deleteMany();
  await prisma.orderline.deleteMany();
  await prisma.productType.deleteMany();
  await prisma.product.deleteMany();
  await prisma.shoppingCartProduct.deleteMany();
  await prisma.user.deleteMany();

  await prisma.country.createMany({ data: country });
  await prisma.extraCostType.createMany({ data: extraCostType });
  await prisma.extraCost.createMany({ data: extraCost });
  await prisma.productType.createMany({ data: productType });
  await prisma.product.createMany({ data: product });
  await prisma.admin.createMany({ data: admin });
  await prisma.user.createMany({ data: user });
  await prisma.address.createMany({ data: address });
  //await prisma.order.createMany({ data: order });
  //await prisma.orderline.createMany({ data: orderline });
  //await prisma.shoppingCartProduct.createMany({ data: shoppingCartProduct });
};

seed();
