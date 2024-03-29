import { Sell } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  getProducts,
  updateProducts,
} from '../../../backend/controllers/product';
import { createSell } from '../../../backend/controllers/sell';
import { prisma } from '../../../prisma/prismaClient';
import { Product } from '../../../types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Sell | Sell[] | Product[] | { error: string }>
) {
  //IF POST REQUEST CREATE SELL - backend/sell.ts
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
        products.forEach((product) => {
          if (product.id == 4735) {
            console.log(product.sell?.createdAt);
          }

          if (product.entry) {
            product.entry = `${(product.entry as Date).getDate()}/${
              (product.entry as Date).getMonth() + 1
            }/${(product.entry as Date).getFullYear()}`;
          }
          if (product.sell?.createdAt) {
            product.sell.createdAt = `${(
              product.sell.createdAt as Date
            ).getDate()}/${(product.sell.createdAt as Date).getMonth() + 1}/${(
              product.sell.createdAt as Date
            ).getFullYear()}`;
          }
        });
        res.status(201).json(products);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).json({ error: 'Server Side Error' });
      });
  }

  //IF DELETE REQUEST DELETE SELLS ON IDS - backend/products.ts
  if (req.method == 'DELETE') {
    const { ids } = req.body;
    return updateProducts(ids, { sellId: null, sellPrice: null })
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
