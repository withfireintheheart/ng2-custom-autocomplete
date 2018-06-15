import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../shared/products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
    @Input() productsList: Product[];

    constructor(
        private productsService: ProductsService
    ) { }

    ngOnInit() {
        this.productsService.onSearchByName
            .subscribe((products: Product[]) => {
                this.productsList = products;
            });
    }

}
