import { PaymentStatus } from 'src/payment-status/entities/payment-status';

export class ReturnPaymentStatusDto {
  id: number;
  name: string;

  constructor(paymentStatus: PaymentStatus) {
    this.id = paymentStatus.id;
    this.name = paymentStatus.name;
  }
}
