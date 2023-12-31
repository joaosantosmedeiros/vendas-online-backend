import { ReturnUserDto } from 'src/user/dtos/return-user-dto';
import { Order } from '../entities/order';
import { ReturnAddressDto } from 'src/address/dtos/return-address-dto';
import { ReturnPaymentDto } from 'src/payment/dtos/return-payment-dto';
import { ReturnOrderProductDto } from 'src/order-product/dtos/return-order-product-dto';

export class ReturnOrderDto {
  id: number;
  date: string;
  user?: ReturnUserDto;
  address?: ReturnAddressDto;
  payment?: ReturnPaymentDto;
  productsAmount: number;
  orderProduct?: ReturnOrderProductDto[];

  constructor(order: Order) {
    this.id = order.id;
    this.date = order.date.toString();
    this.user = order.user ? new ReturnUserDto(order.user) : undefined;
    this.address = order.address
      ? new ReturnAddressDto(order.address)
      : undefined;
    this.payment = order.payment
      ? new ReturnPaymentDto(order.payment)
      : undefined;
    this.productsAmount = order.productsAmount;
    this.orderProduct = order.OrderProduct?.map(
      (oP) => new ReturnOrderProductDto(oP),
    );
  }
}
