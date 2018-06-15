import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Product } from './shared/products';

const products = [
    {
        name: 'Javascript',
        description: 'JavaScript is a programming language that allows you to implement complex things on web pages',
        photo: 'assets/javascript-logo.png'
    },
    {
        name: 'Ruby',
        description: 'A dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.',
        photo: 'assets/ruby-logo.png'
    },
    {
        name: 'Erlang',
        description: 'Erlang is a programming language used to build massively scalable soft real-time systems with requirements on high availability. Some of its uses are in telecoms, banking, e-commerce, computer telephony and instant messaging. Erlang\'s runtime system has built-in support for concurrency, distribution and fault tolerance.',
        photo: 'assets/erlang-logo.png'
    },
    {
        name: 'Elixir',
        description: 'Elixir is a dynamic, functional language designed for building scalable and maintainable applications.',
        photo: 'assets/elixir-logo.png'
    },
    {
        name: 'Typescript',
        description: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
        photo: 'assets/typescript-logo.png'
    },
    {
        name: 'Dart',
        description: 'Dart is an application programming language that’s easy to learn, easy to scale, and deployable everywhere.',
        photo: 'assets/dart-logo.png'
    },
    {
        name: 'Elm',
        description: 'A delightful language for reliable webapps.Generate JavaScript with great performance and no runtime exceptions.',
        photo: 'assets/elm-logo.png'
    },
    {
        name: 'OCaml',
        description: 'originally named Objective Caml, is the main implementation of the programming language Caml, created by Xavier Leroy, Jérôme Vouillon, Damien Doligez, Didier Rémy, Ascánder Suárez and others in 1996. A member of the ML language family, OCaml extends the core Caml language with object-oriented programming constructs.',
        photo: 'assets/ocaml-logo.png'
    },
    {
        name: 'Lisp',
        description: 'Common Lisp',
        photo: 'assets/lisp-logo.png'
    },
    {
        name: 'C++',
        description: 'Is a general-purpose programming language. It has imperative, object-oriented and generic programming features, while also providing facilities for low-level memory manipulation.',
        photo: 'assets/cplusplus-logo.png'
    },
    {
        name: 'Java',
        description: 'Java is a general-purpose computer programming language that is concurrent, class-based, object-oriented,[15] and specifically designed to have as few implementation dependencies as possible.',
        photo: 'assets/java-logo.png'
    },
    {
        name: 'Express',
        description: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
        photo: 'assets/express-logo.png'
    },
    {
        name: 'Angular',
        description: 'Angular puts you in control over scalability. Meet huge data requirements by building data models on RxJS, Immutable.js or another push-model.',
        photo: 'assets/angular-logo.png'
    },
    {
        name: 'Ember',
        description: 'More Productive Out of the Box.Write dramatically less code with Ember\'s Handlebars integrated templates that update automatically when the underlying data changes.',
        photo: 'assets/ember-logo.png'
    },
];

@Injectable()
export class ProductsService {
    public onSearchByName = new Subject<Product[]>();

    constructor() {}

    public getProductsList(): Observable<Product[]> {
        return of(products);
    }

    public handleSearchByName(data: Product[]): void {
        this.onSearchByName.next(data);
    }

}
