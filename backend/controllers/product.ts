import { Prisma } from 'prisma/prisma-client';
import { prisma } from '../../prisma/prismaClient';

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
  size: string,
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
      size,
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
  order = [{ id: 'desc' }],
  fields?: {}
) {
  const products = await prisma.product.findMany({
    take,
    skip,
    where: filter,
    orderBy: order as Prisma.Enumerable<Prisma.ProductOrderByWithRelationInput>,
    select: fields,
  });

  return products;
}

//FIND ONE Product
// PARAMS:
//   ID : NUMBER
export async function getProduct(id: number) {
  const product = await prisma.product.findUnique({
    select: {
      id: true,
      price: true,
      product: true,
      brand: true,
      size: true,
      color: true,
      description: true,
      entry: true,
      sellPrice: true,
    },
    where: { id },
  });

  return product;
}

//DELETE PRODUCT
// PARAMS:
//   ID : NUMBER
export async function deleteProducts(ids: number) {
  const product = await prisma.product.deleteMany({
    where: { id: { in: ids } },
  });

  return product;
}
