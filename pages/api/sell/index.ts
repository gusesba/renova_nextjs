import { Sell } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getProducts } from '../../../backend/controllers/product';
import { createSell } from '../../../backend/controllers/sell';
import { prisma } from '../../../prisma/prismaClient';
import { Product } from '../../../types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Sell | Sell[] | Product[] | { error: string }>
) {
  //IF POST REQUEST CREATE CLIENT - backend/sell.ts
  if (req.method == 'POST' && req.body.action == 'POST') {
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

  //IF POST REQUEST GET Sells - backend/product.ts
  if (req.method == 'POST' && req.body?.action == 'GET') {
    const { number, skip, filter, order, fields } = req.body;

    return getProducts(number, skip, filter, order, fields)
      .then(async (products: Product[]) => {
        await prisma.$disconnect();
        res.status(201).json(products);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).json({ error: 'Server Side Error' });
      });
  }
}
