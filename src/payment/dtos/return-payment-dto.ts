import { ReturnPaymentStatusDto } from 'src/payment-status/dtos/return-payment-status-dto';

export class ReturnPaymentDto {
  id: number;
  statusId: number;
  price: number;
  discount: number;
  finalPrice: number;
  type: string;
  paymentStatus?: ReturnPaymentStatusDto;

  constructor(payment: any) {
    this.id = payment.id;
    this.statusId = payment.status_id;
    this.price = payment.price;
    this.discount = payment.discount;
    this.finalPrice = payment.final_price;
    this.type = payment.type;
    this.paymentStatus = payment.payment_status
      ? new ReturnPaymentStatusDto(payment.payment_status)
      : undefined;
  }
}
