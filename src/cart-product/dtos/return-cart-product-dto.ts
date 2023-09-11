import { ReturnCartDto } from 'src/cart/dtos/return-cart-dto';
import { ReturnProductDto } from 'src/product/dto/return-product-dto';
import { CartProduct } from '../entities/cart-product-entity';

export class ReturnCartProductDto {
  id: number;
  amount: number;
  cartId: number;
  cart?: ReturnCartDto;
  productId: number;
  product?: ReturnProductDto;

  constructor(cartProduct: CartProduct) {
    this.id = cartProduct.id;
    this.cartId = cartProduct.cart_id;
    this.productId = cartProduct.product_id;
    this.amount = cartProduct.amount;
    this.product = cartProduct.product
      ? new ReturnProductDto(cartProduct.product)
      : undefined;
    this.cart = cartProduct.cart
      ? new ReturnCartDto(cartProduct.cart)
      : undefined;
  }
}
