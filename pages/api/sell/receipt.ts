import { Sell } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSells, getRecipt } from '../../../backend/controllers/sell';
import { prisma } from '../../../prisma/prismaClient';
import { Product } from '../../../types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Sell | Sell[] | Product[] | { error: string }>
) {
  //IF POST REQUEST GET Sells - backend/product.ts
  if (req.method == 'POST' && req.body?.action == 'GET') {
    const { number, skip, filter, order, fields } = req.body;
    return getRecipt(number, skip, filter, order, fields)
      .then(async (receipt: any) => {
        res.status(201).json(receipt);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).json({ error: 'Server Side Error' });
      });
  }

  //IF DELETE REQUEST DELETE PRODUCTS ON IDS - backend/products.ts
  if (req.method == 'DELETE') {
    const { ids } = req.body;
    return deleteSells(ids)
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
