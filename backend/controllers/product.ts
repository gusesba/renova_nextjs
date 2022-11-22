import { Prisma } from "prisma/prisma-client";
import { prisma } from "../../prisma/prismaClient";

//CREATE PRODUCT
//PARAMS
//  PRICE       : NUMBER
//  PRODUCT     : STRING
//  BRAND       : STRING
//  COLOR       : STRING
//  PROVIDERID  : NUMBER
//  DESCRIPTION : STRING | NULL
//  ENTRY       : DATE
//  SELLID      : NUMBER | NULL
//  SELLPRICE   : NUMBER | NULL
export async function createProduct(
  price: number,
  product: string,
  brand: string,
  color: string,
  providerId: number,
  description: string | undefined,
  entry: Date,
  sellId: number | undefined,
  sellPrice: number | undefined
) {
  console.log(product);

  const newProduct = await prisma.product.create({
    data: {
      price,
      product,
      brand,
      color,
      description,
      entry,
      providerId,
      sellId,
      sellPrice,
    },
  });
  return newProduct;
}

//FIND ALL PRODUCTS
// PARAMS:
//   NUMBER : NUMBER - QUANTITY OF TUPLES
//   SKIP   : NUMBER - INItIAL TUPLE
export async function getProducts(
  take?: number,
  skip?: number,
  filter = {},
  order = [{ id: "desc" }]
) {
  const products = prisma.product.findMany({
    take,
    skip,
    where: filter,
    orderBy: order as Prisma.Enumerable<Prisma.ProductOrderByWithRelationInput>,
  });

  return products;
}

//FIND ONE Product
// PARAMS:
//   ID : NUMBER
export async function getProduct(id: number) {
  const product = await prisma.product.findUnique({ where: { id } });

  return product;
}

//DELETE PRODUCT
// PARAMS:
//   ID : NUMBER
export async function deleteProduct(id: number) {
  const product = await prisma.product.delete({ where: { id } });

  return product;
}
