import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsListItemComponent } from './products-list/products-list-item/products-list-item.component';
import { ProductsService } from './products.service';
import { AutocompleteInputComponent } from './autocomplete-input/autocomplete-input.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductsListItemComponent,
    AutocompleteInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
