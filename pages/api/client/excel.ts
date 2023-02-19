import { Client } from '.prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import createExcel from '../../../excel/excel';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Client | null | { error: string }>
) {
  //IF GET REQUEST GET ONE CLIENT  - backend/client.ts
  if (req.method == 'GET') {
    return createExcel(req, res);
  }
}
