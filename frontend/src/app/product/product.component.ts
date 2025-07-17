import { Component, OnInit, inject, input } from '@angular/core';
import { Product } from '../shared/models/product';
import { PRODUCTS } from '../mock/products';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../core/services/product.service';
import { CartProduct } from '../shared/models/cart-product';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe],
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit{
  id = input<string>('');
  productService = inject(ProductService);
  product?: Product;
  
  ngOnInit(): void {
    this.productService.getById(this.id()).subscribe(product => {
      this.product = product;
    });

    //cerrar toast
    const closeBtn = document.querySelector('[data-dismiss-target="#toast-success"]');
  closeBtn?.addEventListener('click', () => {
    document.getElementById('toast-success')?.classList.add('hidden');
  });
  }

  addToCart(){
    const cartProduts: CartProduct[] = JSON.parse(localStorage.getItem("cart-products") as string) || [];

    const matched = cartProduts.find(({product,quantity})=> product.id ===this.id());

    if(matched){
      matched.quantity++;
    }else{
      cartProduts.push({product:this.product!,quantity:1});
    }
    localStorage.setItem("cart-products",JSON.stringify(cartProduts));
    this.showSuccessToast("Item added to the cart");
  }

  showSuccessToast(message: string) {
    const toast = document.getElementById('toast-success');
    const text = toast?.querySelector('div.ms-3');
    if (toast && text) {
      text.textContent = message;
  
      // Reinicia cualquier animación previa
      toast.classList.remove('hidden');
      toast.classList.remove('toast-slide-in'); // reset
      void toast.offsetWidth; // hack para reiniciar animación
      toast.classList.add('toast-slide-in');
  
      // Ocultarlo después de 3 segundos
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 3000);
    }
  }
  
}
