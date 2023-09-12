import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/order/dto/create-order-dto';
import { PrismaService } from 'src/prisma.service';
import { Payment } from './entities/payment';
import { PaymentCreditCard } from './entities/payment-credit-cart';
import { PaymentType } from 'src/payment-status/enums/payment-type-enum';
import { PaymentPix } from './entities/payment-pix';
import { Product } from 'src/product/entities/product';
import { Cart } from 'src/cart/entities/cart-entity';

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPayment(
    createOrderDto: CreateOrderDto,
    products: Product[],
    cart: Cart,
  ): Promise<Payment> {
    const finalPrice = cart.CartProduct?.map((cartProduct) => {
      const product = products.find(
        (product) => product.id == cartProduct.product_id,
      );

      if (product) {
        return cartProduct.amount * product.price;
      }

      return 0;
    }).reduce((finalPrice, price) => {
      return finalPrice + price;
    }, 0);

    if (createOrderDto.amount_payments) {
      const paymentCreditCard = new PaymentCreditCard(
        PaymentType.Done,
        finalPrice,
        0,
        finalPrice,
        createOrderDto,
      );

      return this.prismaService.payment.create({
        data: { ...paymentCreditCard, type: 'PaymentCreditCardEntity' },
      });
    } else if (createOrderDto.pixCode && createOrderDto.paymentDate) {
      const paymentPix = new PaymentPix(
        PaymentType.Done,
        finalPrice,
        0,
        finalPrice,
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
