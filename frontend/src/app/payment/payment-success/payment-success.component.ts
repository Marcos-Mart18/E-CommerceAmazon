import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PurchaseService } from '../../core/services/purchase.service';
import { CartProduct } from '../../shared/models/cart-product';

@Component({
  selector: 'app-payment-success',
  imports: [RouterLink],
  templateUrl: './payment-success.component.html'
})
export class PaymentSuccessComponent implements OnInit{
  prucahseService = inject(PurchaseService);

  ngOnInit(): void {
    const cartProducts: CartProduct[]= JSON.parse(localStorage.getItem('cart-products') as string);
    localStorage.removeItem('cart-products');

    const total = cartProducts.reduce((acc, val) => acc + (val.product.price * val.quantity), 0);

    this.prucahseService
    .save({
      total,
      data: cartProducts.map(({product, quantity}) => {
        return {
          product,
          quantity,
          total: Math.round(product.price * quantity), 
        };
      }), 
    }).subscribe(result =>{
      console.log(result.message);
    })
  }
} 
