import { Decimal } from '@prisma/client/runtime';

export type Client = {
  id?: number;
  phone?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Product = {
  id?: number;
  price?: Decimal;
  product?: string;
  brand?: string;
  size?: string;
  color?: string;
  providerId?: number;
  description?: string | null;
  entry?: Date | string;
  sellId?: number | null;
  sellPrice?: Decimal | null;
  createdAt?: Date;
  updatedAt?: Date;
  sell?: Sell;
};

export type Sell = {
  id?: number;
  type?: string;
  buyerId?: number;
  createdAt?: Date | string;
  updatedAt?: Date;
};
