import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';

import { ErrorNotifierService } from './services/error.notifier';
import { BooksService } from './services/book.service';

import { Book, BookKind, Publisher, Author } from './models/book';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [ BooksService ]
})
export class AppComponent {
  books: Book[];
  details: Book;

  error: any;
  validationError: any;

  constructor(private http:Http, private errorNotifier:ErrorNotifierService,
  	private booksService:BooksService) {
  	this.errorNotifier.onError(err => {
  	  this.error = err;
  	  console.log(err);
  	});
  }

  getBooks() {
  	this.booksService.getBooks()
  	        .subscribe((data:Book[]) => {
  	          this.books = data;
  	        });
  }

  getBookDetails(bookId:string) {
    this.booksService.getBookWithDetails(bookId)
            .subscribe(details => {
              this.details = details;
            })
  }
}