import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
<<<<<<< HEAD
import { Http, ConnectionBackend } from '@angular/http';

import { ErrorNotifierService } from './services/error.notifier';
import { BooksService } from './services/book.service';
import { CustomHttp } from './services/custom.http';
=======
import { Http } from '@angular/http';

import { ErrorNotifierService } from './services/error.notifier';
import { BooksService } from './services/book.service';
>>>>>>> 4256d13057841051df00ea6f235d92c19af74d2f

import { Book, BookKind, Publisher, Author } from './models/book';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
<<<<<<< HEAD
  providers: [ BooksService, CustomHttp, ConnectionBackend ]
=======
  providers: [ BooksService ]
>>>>>>> 4256d13057841051df00ea6f235d92c19af74d2f
})
export class AppComponent {
  books: Book[];
  details: Book;

  error: any;
  validationError: any;

<<<<<<< HEAD
  constructor(private http:CustomHttp, private errorNotifier:ErrorNotifierService,
=======
  constructor(private http:Http, private errorNotifier:ErrorNotifierService,
>>>>>>> 4256d13057841051df00ea6f235d92c19af74d2f
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