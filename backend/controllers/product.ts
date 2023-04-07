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
    orderBy:
      order as Prisma.Enumerable<Prisma.ProductOrderByWithAggregationInput>,
    select: fields,
  });

  return products;
}

//FIND ONE Product
// PARAMS:
//   ID : NUMBER
export async function getProduct(id: number) {
  const product: any = await prisma.product.findUnique({
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
      sell: { select: { type: true } },
      provider: { select: { name: true } },
    },
    where: { id },
  });

  if (
    product &&
    ((product.sell && product.sell.type == 'Emprestimo') || !product.sellPrice)
  ) {
    delete product.sell;
    return product;
  }

  return { error: 'Produto não está em estoque' };
}

//DELETE PRODUCT
// PARAMS:
//   IDS : ARRAY<NUMBER>
export async function deleteProducts(ids: Array<number>) {
  const products = await prisma.product.deleteMany({
    where: { id: { in: ids } },
  });

  return products;
}

//UPDATE PRODUCTS
// PARAMS:
// IDS : ARRAY<NUMBER>

export async function updateProducts(ids: Array<number>, data: {}) {
  const products = await prisma.product.updateMany({
    where: { id: { in: ids } },
    data: data,
  });
  return products;
}

export async function updateProduct(
  id: number,
  price: number,
  product: string,
  brand: string,
  size: string,
  color: string,
  providerId: number,
  description: string | undefined,
  entry: Date | undefined,
  sellId: number | undefined,
  sellPrice: number | undefined
) {
  const products = await prisma.product.update({
    where: { id },
    data: {
      price,
      product,
      brand,
      size,
      color,
      providerId,
      description,
      entry,
      sellId,
      sellPrice,
    },
  });
  return products;
}
