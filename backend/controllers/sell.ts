import { prisma } from '../../prisma/prismaClient';

//CREATE SELL
//PARAMS
//  TYPE  : STRING
//  BUYERID : NUMBER
//  PRODUCTS : ID
export async function createSell(
  type: string,
  buyerId: number,
  products: [{}]
) {
  const sell = await prisma.sell.create({
    data: {
      type,
      buyerId,
    },
  });
  products.forEach(async (product: any) => {
    await prisma.product.update({
      where: { id: product.id },
      data: {
        sellId: sell.id,
        sellPrice: type == 'Venda' ? product.sellPrice : 0,
      },
    });
  });
  return sell;
}
