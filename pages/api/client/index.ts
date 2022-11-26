import { NextApiRequest, NextApiResponse } from 'next';
import {
  createClient,
  deleteClients,
  getClients,
} from '../../../backend/controllers/client';
import { prisma } from '../../../prisma/prismaClient';
import { Client } from '../../../types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Client | Client[] | { error: string }>
) {
  //IF POST REQUEST CREATE CLIENT - backend/client.ts
  if (req.method == 'POST' && req.body?.action == 'POST') {
    const { name, phone } = req.body;

    if (!name) return res.status(400).json({ error: 'Bad Request' });
    if (name.length == 0) return res.status(400).json({ error: 'Bad Request' });
    if (typeof name != 'string')
      return res.status(400).json({ error: 'Bad Request' });

    if (!phone) return res.status(400).json({ error: 'Bad Request' });
    if (phone.length == 0)
      return res.status(400).json({ error: 'Bad Request' });
    if (typeof phone != 'string')
      return res.status(400).json({ error: 'Bad Request' });

    return createClient(name, phone)
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

  //IF GET REQUEST GET ALL CLIENTS - backend/client.ts
  if (req.method == 'POST' && req.body?.action == 'GET') {
    const { number, skip, filter, order, select } = req.body;
    return getClients(number, skip, filter, order, select)
      .then(async (clients: Client[]) => {
        await prisma.$disconnect();
        res.status(201).json(clients);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).json({ error: 'Server Side Error' });
      });
  }

  //IF DELETE REQUEST DELETE CLIENTS ON IDS - backend/client.ts
  if (req.method == 'DELETE') {
    const { ids } = req.body;
    return deleteClients(ids)
      .then(async (count: any) => {
        await prisma.$disconnect();
        res.status(201).json(count);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).json({ error: 'Server Side Error' });
      });
  }
}
