import { Cart } from '../entities/cart-entity';
import { ReturnCartProductDto } from 'src/cart-product/dtos/return-cart-product-dto';

export class ReturnCartDto {
  id: number;
  cartProduct?: ReturnCartProductDto[];

  constructor(cart: Cart) {
    this.id = cart.id;
    this.cartProduct = cart.CartProduct
      ? cart.CartProduct.map(
          (cartProduct) => new ReturnCartProductDto(cartProduct),
        )
      : undefined;
  }
}
