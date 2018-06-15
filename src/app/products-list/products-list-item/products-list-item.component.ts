import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../shared/products';

@Component({
  selector: 'app-products-list-item',
  templateUrl: './products-list-item.component.html',
  styleUrls: ['./products-list-item.component.scss']
})
export class ProductsListItemComponent implements OnInit {
    @Input() product: Product;
    constructor() { }

    ngOnInit() {
    }

}
