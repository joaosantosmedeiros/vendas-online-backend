export abstract class Payment {
  id: number;
  status_id: number;
  price: number;
  discount: number;
  final_price: number;
  type: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    status_id: number,
    price: number,
    discount: number,
    final_price: number,
  ) {
    this.status_id = status_id;
    this.price = price;
    this.discount = discount;
    this.final_price = final_price;
  }
}
