import { NextApiRequest, NextApiResponse } from 'next';
import { getProduct } from '../../../backend/controllers/product';
import { Product } from '../../../types/types';

import { prisma } from '../../../prisma/prismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | null | { error: string }>
) {
  //IF GET REQUEST GET ONE PRODUCT - backend/product.ts
  if (req.method == 'GET') {
    const { id } = req.query;

    return getProduct(parseInt(id as string))
      .then(async (product: Product | null) => {
        await prisma.$disconnect();

        if (product) {
          product.entry = `${(product.entry as Date).getDay()}/${(
            product.entry as Date
          ).getMonth()}/${(product.entry as Date).getFullYear()}`;
        }
        res.status(201).json(product);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).json({ error: 'Server Side Error' });
      });
  }
}
