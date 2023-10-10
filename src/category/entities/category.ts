export class Category {
  id: number;
  name: string;
  _count?: { Product: number };
  Product?: any;
  createdAt: Date;
  updatedAt: Date;
}
