import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/order/dto/create-order-dto';
import { PrismaService } from 'src/prisma.service';
import { Payment } from './entities/payment';
import { PaymentCreditCard } from './entities/payment-credit-cart';
import { PaymentType } from 'src/payment-status/enums/payment-type-enum';
import { PaymentPix } from './entities/payment-pix';

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPayment(createOrderDto: CreateOrderDto): Promise<Payment> {
    if (createOrderDto.amount_payments) {
      const paymentCreditCard = new PaymentCreditCard(
        PaymentType.Done,
        0,
        0,
        0,
        createOrderDto,
      );

      return this.prismaService.payment.create({
        data: { ...paymentCreditCard, type: 'PaymentCreditCardEntity' },
      });
    } else if (createOrderDto.pixCode && createOrderDto.paymentDate) {
      const paymentPix = new PaymentPix(
        PaymentType.Done,
        0,
        0,
        0,
        createOrderDto,
      );

      return this.prismaService.payment.create({
        data: { ...paymentPix, type: 'PaymentPixEntity' },
      });
    } else {
      throw new BadRequestException(
        'Amount Payments, PixCode or PaymentDate not found.',
      );
    }
  }
}
