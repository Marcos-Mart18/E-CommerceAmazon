import { Component, OnInit, inject } from '@angular/core';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { CartProduct } from '../shared/models/cart-product';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaymentService } from '../core/services/payment.service';

@Component({
  selector: 'app-cart',
  imports: [CartProductComponent,CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit{
  cartProducts: CartProduct[]=[];
  total:number=0;
  paymentService = inject(PaymentService);
  ngOnInit(): void {
    this.updateCart();
  }

  updateCart(){
    const storageProducts: CartProduct[] = JSON.parse(localStorage.getItem("cart-products") as string) || [];
    this.cartProducts=storageProducts;
    
    this.total = this.cartProducts.reduce((acc,val)=>acc +(val.product.price * val.quantity),0);
  }

  proccedToCheckout(){
    if(this.cartProducts.length == 0) return;

    this.paymentService.checkout(
      {
        total: this.total,
        data: this.cartProducts,
      }).subscribe((result)=>{
        location.href = result.url;
      });

  }
}
