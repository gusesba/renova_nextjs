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
      .then(async (product: Product | null | { error: string }) => {
        await prisma.$disconnect();

        if (product == null)
          res.status(200).json({ error: 'Produto não cadastrado' });

        if (!(product as { error: string }).error) {
          (product as Product).entry = `${(
            (product as Product).entry as Date
          ).getDay()}/${((product as Product).entry as Date).getMonth()}/${(
            (product as Product).entry as Date
          ).getFullYear()}`;
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
