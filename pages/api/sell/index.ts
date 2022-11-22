import { Sell } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSell } from '../../../backend/controllers/sell';
import { prisma } from '../../../prisma/prismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Sell | Sell[] | { error: string }>
) {
  //IF POST REQUEST CREATE CLIENT - backend/sell.ts
  if (req.method == 'POST') {
    const { type, buyerId, products } = req.body;

    return createSell(type, buyerId, products)
      .then(async (sell: Sell) => {
        await prisma.$disconnect();
        res.status(201).json(sell);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).json({ error: 'Server Side Error' });
      });
  }
}
