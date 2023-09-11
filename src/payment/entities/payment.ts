export abstract class Payment {
  id: number;
  status_id: number;
  price: number;
  discount: number;
  final_price: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}
