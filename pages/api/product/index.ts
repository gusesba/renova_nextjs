import { NextApiRequest, NextApiResponse } from 'next';
import {
  createProduct,
  deleteProducts,
  getProducts,
} from '../../../backend/controllers/product';
import { prisma } from '../../../prisma/prismaClient';
import { Product } from '../../../types/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | Product[] | { error: string }>
) {
  //IF POST REQUEST CREATE PRODUCT - backend/product.ts
  if (req.method == 'POST' && req.body?.action == 'POST') {
    const {
      price,
      product,
      brand,
      size,
      color,
      providerId,
      description,
      entry,
      sellId,
      sellPrice,
    } = req.body;

    return createProduct(
      price,
      product,
      brand,
      size,
      color,
      providerId,
      description,
      entry,
      sellId,
      sellPrice
    )
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
  //IF POST REQUEST GET PRODUCTS - backend/product.ts
  if (req.method == 'POST' && req.body?.action == 'GET') {
    const { number, skip, filter, order, fields } = req.body;

    return getProducts(number, skip, filter, order, fields)
      .then(async (products: Product[]) => {
        await prisma.$disconnect();
        products.forEach((product) => {
          if (product.entry) {
            product.entry = `${(product.entry as Date).getUTCDate()}/${
              (product.entry as Date).getUTCMonth() + 1
            }/${(product.entry as Date).getUTCFullYear()}`;
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

  //IF DELETE REQUEST DELETE PRODUCTS ON IDS - backend/products.ts
  if (req.method == 'DELETE') {
    const { ids } = req.body;
    return deleteProducts(ids)
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
