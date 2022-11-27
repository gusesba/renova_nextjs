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
  console.log(fields);

  const clients = await prisma.client.findMany({
    select: fields,
    take,
    skip,
    where: filter,
    orderBy: order as Prisma.Enumerable<Prisma.ClientOrderByWithRelationInput>,
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
