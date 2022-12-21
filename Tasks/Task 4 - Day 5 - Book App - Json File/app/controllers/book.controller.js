const { json } = require("express");
const jsonHelper = require("../helpers/dealWithJson.helper");

const Book = require("./book.class");
class BookController {
  static sortPagesUp = false;
  static sortNameUp = false;
  static sortSectionUp = false;

  static allBooks = (req, res) => {
    let books = this.getAllBooks();

    const { search, sort } = req.query;

    if (search) {
      books = this.searchInBooks(search, books);
    }

    if (sort) {
      books = this.sortBooks(sort, books);
    }

    res.render("allBooks", { pageTitle: "All Books", books, search });
  };

  static searchInBooks = (search) => {
    return this.filterBooks(search);
  };

  static sortBooks = (sort, books) => {
    if (sort == "name") {
      books.sort(Book.compareBookName.bind(this.sortNameUp ? true : false));
      this.sortNameUp = !this.sortNameUp;
    }

    if (sort == "pages") {
      books.sort(Book.compareBookPages.bind(this.sortPagesUp ? true : false));
      this.sortPagesUp = !this.sortPagesUp;
    }

    if (sort == "section") {
      books.sort(
        Book.compareBookSection.bind(this.sortSectionUp ? true : false)
      );
      this.sortSectionUp = !this.sortSectionUp;
    }

    return books;
  };

  static showBook = (req, res) => {
    const id = req.params.id;
    const book = this.getBookById(id);
    res.render("showBook", { pageTitle: "Book Details", book });
  };

  static addBook = (req, res) => {
    res.render("addBook", { pageTitle: "Create New Book" });
  };

  static addBookLogic = (req, res) => {
    const newBook = Book.mapObjectToBook(req.body);
    const books = this.getAllBooks();
    books.push(newBook);
    jsonHelper.writeToJson(books);
    res.redirect(`/showBook/${newBook.id}`);
  };

  static editBook = (req, res) => {
    const id = req.params.id;
    const book = this.getBookById(id);
    res.render("editBook", { pageTitle: "Edit Book", book });
  };

  static editBookLogic = (req, res) => {
    const id = req.params.id;
    const index = this.getBookIndex(id);

    const books = this.getAllBooks();
    const book = books[index];

    const newBook = { id: book.id, ...req.body };
    books[index] = newBook;
    jsonHelper.writeToJson(books);
    res.redirect(`/showBook/${newBook.id}`);
  };

  static deleteBook = (req, res) => {
    const id = req.params.id;
    const books = this.getAllBooks();
    const newBooks = books.filter((b) => b.id != id);
    jsonHelper.writeToJson(newBooks);
    res.redirect("/");
  };

  static getAllBooks() {
    return Book.mapListToBooks(jsonHelper.readFromJson());
  }

  static getBookById(id) {
    return this.getAllBooks().find((b) => b.id == id);
  }

  static getBookIndex(id) {
    return this.getAllBooks().findIndex((b) => b.id == id);
  }

  static filterBooks(search, books) {
    return this.getAllBooks().filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase())
    );
  }
}

module.exports = BookController;
