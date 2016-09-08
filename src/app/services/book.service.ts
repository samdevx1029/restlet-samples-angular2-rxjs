import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { Book, BookKind, Publisher, Author } from '../models/book';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class BooksService {
  private bookKinds: BookKind[];

  constructor(private http:Http) {

  }

  getBooks() {
    return <Observable<Book[]>>this.http.get('/books/')
             .map(res => <{ list: Book[] }>res.json())
             .map(data => <Book[]>data.list);
  }

  getBooksByTitle(title:string) {
    let parameters = new URLSearchParams();
    parameters.set('title', title);
    return this.http.get('/books/', {
      search: parameters
    }).map(res => res.json());
  }

  getBookAuthors(bookId: string): Observable<any> {
    return this.http.get(`/books/${bookId}`).map(res => res.json())
        .flatMap((book:Book) => {
          return Observable.forkJoin(<Observable<Author>[]>book.authors.map((author:Author) => {
            return this.http.get(`/authors/${author.author}`).map(res => <Author>res.json());
          }));
        });
  }

  getBookPublisher(bookId: string) {
    return this.http.get(`/books/${bookId}`).map(res => <Book>res.json())
        .flatMap((book:Book) => {
          return this.http.get(`/publishers/${book.publisher.publisher}`).map(res => <Publisher>res.json());
        });
  }

  getBookWithDetails(bookId: string) {
    return this.http.get(`/books/${bookId}`).map(res => res.json())
      .flatMap((book) => {
        return Observable.forkJoin(
          Observable.of(book)
          // commented until data consistency fix
          //  this.getBookAuthors(book.id),
          //  this.getBookPublisher(book.id)
        );
      }).map((bookDetails) => {
        let book = bookDetails[0];

        // commented until data consistency fix
        //book.authorsDetail = bookDetails[1];
        //book.publisherDetail = bookDetails[2];

        console.log(book);

        return book;
      });
  }

  addBook(book:Book) {
    return this.http.post(
      '/books/',
      book);
  }

  getBookKinds(): Observable<BookKind[]> {
    if (this.bookKinds) {
      return Observable.of(this.bookKinds);
    } else {
      return this.http.get('/bookkinds').map(res => res.json());
    }
  }
}
