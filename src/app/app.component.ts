import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './shared/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    products: Product[] = [];
    constructor(
        private productsService: ProductsService
    ) {}

    ngOnInit() {
        this.productsService.getProductsList()
            .subscribe((products: Product[]) => {
                this.products = products;
            });
    }
}
