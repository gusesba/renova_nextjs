import { Sell } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getRecipt } from '../../../backend/controllers/sell';
import { prisma } from '../../../prisma/prismaClient';
import { Product } from '../../../types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Sell | Sell[] | Product[] | { error: string }>
) {
  //IF POST REQUEST GET Sells - backend/product.ts
  if (req.method == 'POST' && req.body?.action == 'GET') {
    const { number, skip } = req.body;
    return getRecipt(number, skip)
      .then(async (receipt: any) => {
        res.status(201).json(receipt);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).json({ error: 'Server Side Error' });
      });
  }
}
