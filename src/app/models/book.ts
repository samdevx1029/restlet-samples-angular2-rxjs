export interface Author {
  id:string;
  name:string;
  author:string;
}

export interface Publisher {
  id:string;
  name:string;
  publisher:string;
}

export interface BookKind {
  id:string;
  name:string;
}

export interface Book {
  title:string;
  authors:Author[];
  publisher: Publisher;
}