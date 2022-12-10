const jsonHelper = require("../helpers/dealWithJson.helper");
const { search } = require("../routes/book.routes");

const Book = require("./book.class");
class BookController {
  static sortPagesUp = true;
  static sortNameUp = true;
  static sortSectionUp = true;

  static allBooks = (req, res) => {
    // if (req.query.search) {
    //   console.log(req.query.search);
    //   return this.searchInBooks(req, res);
    // }

    const books = this.getAllBooks();
    res.render("allBooks", { pageTitle: "All Books", books });
  };

  static searchInBooks = (req, res) => {
    const search = req.query.search;
    const books = this.filterBooks(search);
    res.render("allBooks", { pageTitle: "All Books", books });
  };

  static sortBooks = (req, res) => {
    let books = this.getAllBooks();

    // If user sort in search page. (only work one time.)
    const referrer = req.get("Referrer");
    const search = referrer?.includes("search") && referrer.split("=")[1];
    if (search) {
      books = this.filterBooks(search);
    }

    if (req.params.sortBy == "name") {
      books.sort(Book.compareBookName.bind(this.sortNameUp ? true : false));
      this.sortNameUp = !this.sortNameUp;
    }

    if (req.params.sortBy == "pages") {
      books.sort(Book.compareBookPages.bind(this.sortPagesUp ? true : false));
      this.sortPagesUp = !this.sortPagesUp;
    }

    if (req.params.sortBy == "section") {
      books.sort(
        Book.compareBookSection.bind(this.sortSectionUp ? true : false)
      );
      this.sortSectionUp = !this.sortSectionUp;
    }

    res.render("allBooks", { pageTitle: "All Books", books });
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

  static filterBooks(search) {
    return this.getAllBooks().filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase())
    );
  }
}

module.exports = BookController;
