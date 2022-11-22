import { Client } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteClient, getClient } from '../../../backend/controllers/client';
import { prisma } from '../../../prisma/prismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Client | null | { error: string }>
) {
  //IF GET REQUEST GET ONE CLIENT - backend/client.ts
  if (req.method == 'GET') {
    const { id } = req.query;

    return getClient(parseInt(id as string))
      .then(async (client: Client | null) => {
        await prisma.$disconnect();
        res.status(201).json(client);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).json({ error: 'Server Side Error' });
      });
  }

  //IF DELETE REQUEST DELETE ONE CLIENT - backend/client.ts
  if (req.method == 'DELETE') {
    const { id } = req.query;

    return deleteClient(parseInt(id as string))
      .then(async (client: Client) => {
        await prisma.$disconnect();
        res.status(201).json(client);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).json({ error: 'Server Side Error' });
      });
  }
}
