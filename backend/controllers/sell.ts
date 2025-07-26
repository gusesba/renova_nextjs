import { Prisma, Product, Sell } from 'prisma/prisma-client';
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

export async function deleteSells(ids: Array<number>) {
  const sells = await prisma.sell.findMany({
    where: {
      id: { in: ids },
    },
    include: {
      products: true,
    },
  }) as Array<Sell & { products: Product[] }>;
  sells.forEach((sell) => {
    if (sell.products.length > 0) {
      const index = ids.indexOf(sell.id);

      ids.splice(index, 1);
    }
  });

  const count = await prisma.sell.deleteMany({
    where: { id: { in: ids } },
  });
  return count;
}

export async function getRecipt(
  take?: number,
  skip?: number,
  filter = {},
  order = [{ id: 'desc' }],
  fields?: {}
) {
  const sells = await prisma.sell.findMany({
    take,
    skip,
    select: fields,
    where: filter,
    orderBy:
      order as Prisma.Enumerable<Prisma.ProductOrderByWithAggregationInput>,
  });

  const sellList = sells.map((sell: any) => {
    const totalProducts = sell.products.length;
    const totalSellPrice = sell.products.reduce(
      (acummulator: any, current: any) => {
        return parseFloat(acummulator) + parseFloat(current.sellPrice);
      },
      0.0
    );
    return {
      id: sell.id,
      type: sell.type,
      buyer: { name: sell.buyer.name },
      products: { sellPrice: totalProducts, id: totalSellPrice },
    };
  });

  return sellList;
}
