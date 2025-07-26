import { Prisma } from 'prisma/prisma-client';
import { prisma } from '../../prisma/prismaClient';

//CREATE CLIENT
//PARAMS
//  NAME  : STRING
//  PHONE : STRING
export async function createClient(name: string, phone: string) {
  const client = await prisma.client.create({
    data: {
      name,
      phone,
    },
  });
  return client;
}

//FIND ALL CLIENTS
// PARAMS:
//   NUMBER : NUMBER - QUANTITY OF TUPLES
//   SKIP   : NUMBER - INItIAL TUPLE
export async function getClients(
  take?: number,
  skip?: number,
  filter = {},
  order = [{ id: 'desc' }],
  fields?: {}
) {
  const clients = await prisma.client.findMany({
    select: fields,
    take,
    skip,
    where: filter,
    orderBy:
      order as Prisma.Enumerable<Prisma.ClientOrderByWithAggregationInput>,
  });

  return clients;
}

prisma.client.findMany;

//FIND ONE CLIENT
// PARAMS:
//   ID : NUMBER
export async function getClient(id: number) {
  const client = await prisma.client.findUnique({
    where: { id },
  });

  return client;
}

//DELETE CLIENT
// PARAMS:
//   ID : NUMBER
export async function deleteClients(ids: Array<number>) {
  const count = await prisma.client.deleteMany({ where: { id: { in: ids } } });

  return count;
}

export async function updateClient(id: number, name?: string, phone?: string) {
  const client = await prisma.client.update({
    where: {
      id,
    },
    data: {
      name,
      phone,
    },
  });
  return client;
}

export async function getClientPageHeaderData(
  id: number,
  dateMax: string,
  dateMin: string
) {
  const client = await prisma.client.findUnique({
  select: { name: true, phone: true },
  where: { id },
}) as { name: string; phone: string } | null;

  const sells = await prisma.product.aggregate({
    _count: { id: true },
    _sum: { sellPrice: true },
    where: {
      providerId: id,
      sellId: { not: null },
      sell: {
        type: 'Venda',
        createdAt: {
          gte: new Date(dateMin),
          lte: new Date(dateMax),
        },
      },
    },
  });

  const buys = await prisma.product.aggregate({
    _count: { id: true },
    _sum: { sellPrice: true },
    where: {
      sell: {
        type: 'Venda',
        buyer: {
          id: id,
        },
        createdAt: {
          gte: new Date(dateMin),
          lte: new Date(dateMax),
        },
      },
    },
  });

  return {
    name: client?.name,
    phone: client?.phone,
    sells: sells._count.id,
    totalSells: sells._sum.sellPrice,
    buys: buys._count.id,
    totalBuys: buys._sum.sellPrice,
  };
}

export async function getClientsSells(dateMin: Date, dateMax: Date) {
  const sells = await prisma.client.findMany({
    include: {
      products: {
        where: {
          sell: {
            type: 'Venda',
            createdAt: {
              gte: new Date(dateMin),
              lte: new Date(dateMax),
            },
          },
        },
        include: {
          sell: {
            include: {
              buyer: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      purchases: {
        where: {
          type: 'Venda',
          createdAt: {
            gte: new Date(dateMin),
            lte: new Date(dateMax),
          },
        },
        include: {
          products: {
            include: {
              provider: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  return sells;
}
