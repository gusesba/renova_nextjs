import { Product } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteProduct,
  getProduct,
} from '../../../backend/controllers/product';

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
        res.status(201).json(product);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).json({ error: 'Server Side Error' });
      });
  }

  //IF DELETE REQUEST DELETE ONE PRODUCT - backend/product.ts
  if (req.method == 'DELETE') {
    const { id } = req.query;

    return deleteProduct(parseInt(id as string))
      .then(async (product: Product) => {
        await prisma.$disconnect();
        res.status(201).json(product);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).json({ error: 'Server Side Error' });
      });
  }
}
