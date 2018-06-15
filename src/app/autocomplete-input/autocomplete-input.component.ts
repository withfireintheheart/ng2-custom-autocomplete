import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Product } from '../shared/products';
import { ProductsService } from '../products.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';


@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit {
    @Input() productsList: Product[];
    @ViewChild('list') list: ElementRef;
    @ViewChild('autocompleteInput') autocompleteInput: ElementRef;

    public findQuery = '';
    public snippets: Product[] = [];
    public snippetCurrentItem: Product;
    private keyboardNavIndex = 0;

    constructor(
        private productsService: ProductsService,
        private renderer: Renderer2
    ) {}

    public onKeyboardNavigate(event): void {
        const key = event.keyCode;
        const list = this.list.nativeElement;

        // Down key
        if (key === 40) {
            event.preventDefault();
            this.keyboardNavIndex++;
            if (this.keyboardNavIndex >= list.children.length) {
                this.keyboardNavIndex = list.children.length;
            }
            this.snippetCurrentItem = this.snippets[this.keyboardNavIndex - 1];
        }

        // Up key
        if (key === 38) {
            event.preventDefault();
            this.keyboardNavIndex--;
            if (this.keyboardNavIndex <= 0) {
                this.keyboardNavIndex = 1;
            }
            this.snippetCurrentItem = this.snippets[this.keyboardNavIndex - 1];
        }

        // Enter key
        if (key === 13) {
            this.findQuery = this.snippets[this.keyboardNavIndex - 1].name;

            const filteredByQuery = this.getSelectedProduct(this.productsList, this.findQuery);
            this.productsService.handleSearchByName(filteredByQuery);

            this.keyboardNavIndex = 0;
            this.snippets.length = 0;
        }
    }

    private getSelectedProduct(products: Product[], query: string): Product[] {
        const reg = new RegExp(`^${query}$`, 'i');
        return products.filter(product => reg.test(product.name));
    }

    private fillterProductsByName(products: Product[], query: string): Product[] {
        const template = Object.assign([], this.productsList);
        return template.filter(product => {
            return product.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
    }

    private onSearchProduct(query: string): void {
        if (query === '') {
            this.snippets.length = 0;
            this.productsService.handleSearchByName(this.productsList);
            return;
        }

        const filteredByQuery = this.fillterProductsByName(this.productsList, query);
        this.productsService.handleSearchByName(filteredByQuery);

        this.snippets = filteredByQuery.map(({ name, description, photo }) => {
            return { name, description, photo, highlighted: query };
        });

        const hideSnippetBar = this.renderer.listen(document, 'click', () => {
            this.keyboardNavIndex = 0;
            this.snippets.length = 0;
            hideSnippetBar();

        });
    }

    private highlight(name, highlighted): string {
        const startIndex = name.toLowerCase().search(highlighted.toLowerCase());
        const endIndex = startIndex + highlighted.length;
        return `${name.slice(0, startIndex)}<strong>${name.slice(startIndex, endIndex)}</strong>${name.slice(endIndex)}`;
    }

    ngOnInit() {
        const autocompleteInput = this.autocompleteInput.nativeElement;
        Observable.fromEvent(autocompleteInput, 'input')
            .map((e: any) => e.target.value)
            .debounceTime(500)
            .subscribe(query => this.onSearchProduct(query));
    }
}
