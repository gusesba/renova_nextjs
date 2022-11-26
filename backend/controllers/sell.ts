import { Prisma } from 'prisma/prisma-client';
import { prisma } from '../../prisma/prismaClient';

//CREATE SELL
//PARAMS
//  TYPE  : STRING
//  BUYERID : NUMBER
//  PRODUCTS : ID
export async function createSell(
  type: string,
  buyerId: number,
  products: Prisma.Enumerable<Prisma.ProductWhereUniqueInput> | undefined
) {
  const sell = await prisma.sell.create({
    data: {
      type,
      buyerId,
      products: {
        connect: products,
      },
    },
  });
  return sell;
}
