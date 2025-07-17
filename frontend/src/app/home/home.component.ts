import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ProductOfferComponent } from '../shared/components/product-offer/product-offer.component';
import { Product } from '../shared/models/product';
import { HomeProductComponent } from './components/home-product/home-product.component';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-home',
  imports: [ProductOfferComponent,HomeProductComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit{
  productService = inject(ProductService); 
  
  products!: Product[];
  productOffers!: Product[];



  ngOnInit(): void {
    this.productService.getAll().subscribe(products => {
      this.products = products;
      this.productOffers = products.filter(p => p.previousPrice);
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      initFlowbite();
    }, 100);
  }
}
