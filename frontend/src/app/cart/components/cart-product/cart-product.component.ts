import { Component, OnInit, input, output } from '@angular/core';
import { CartProduct } from '../../../shared/models/cart-product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-product',
  imports: [CurrencyPipe],
  templateUrl: './cart-product.component.html'
})
export class CartProductComponent implements OnInit{
  cartProduct = input.required<CartProduct>();
  total: number=0;
  updateCartEvent = output<void>();

  ngOnInit(): void {
    this.updateTotal();
  }

  updateQuantity(num: number){
    let result = this.cartProduct().quantity+ num;

    if(result===0){
      result=1;
    }

    this.cartProduct().quantity = result;
    this.updateTotal();
    this.updateCart();
    this.updateCartEvent.emit();
  }

  removeProduct(){
    const cartProduct: CartProduct[]= JSON.parse(localStorage.getItem("cart-products") as string);
    const filteredCartProduct = cartProduct.filter(({product})=> product.id !== this.cartProduct().product.id);
    localStorage.setItem("cart-products", JSON.stringify(filteredCartProduct));
    this.updateCartEvent.emit();
  }

  private updateTotal(){
    this.total = this.cartProduct().product.price * this.cartProduct().quantity;
  }

  private updateCart(){
    const cartProduct: CartProduct[]= JSON.parse(localStorage.getItem("cart-products") as string);
    const filteredCartProduct = cartProduct.filter(({product})=> product.id !== this.cartProduct().product.id);
    const updateCartProducts = [...filteredCartProduct, this.cartProduct()];

    localStorage.setItem("cart-products", JSON.stringify(updateCartProducts));
  }

}
