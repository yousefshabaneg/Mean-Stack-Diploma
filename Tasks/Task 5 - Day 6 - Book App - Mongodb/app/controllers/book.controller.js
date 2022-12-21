const { json } = require("express");
const jsonHelper = require("../helpers/dealWithJson.helper");
const connection = require("../../data/mongo");
const { ObjectId } = require("mongodb");

const Book = require("./book.class");
class BookController {
  static sortPagesUp = false;
  static sortNameUp = false;
  static sortSectionUp = false;

  static allBooks = (req, res) => {
    const { search, sort } = req.query;
    const searchObject = this.getSearchObject(search);
    const sortObject = this.getSortObject(sort);

    try {
      connection((db) => {
        db.collection("books")
          .find(searchObject)
          .sort(sortObject)
          .toArray((err, books) => {
            if (err) return this.renderError(res, err.message);

            res.render("allBooks", { pageTitle: "All Books", books, search });
          });
      });
    } catch (err) {
      return this.renderError(res, err.message);
    }
  };

  /* START Search and Sort Using Mongodb */
  static getSortObject(sort) {
    if (!sort) return {};

    let key, descOrAsc;
    if (sort == "name") {
      descOrAsc = this.sortNameUp ? 1 : -1;
      this.sortNameUp = !this.sortNameUp;
      key = "name";
      console.log(key);
    }

    if (sort == "pages") {
      descOrAsc = this.sortPagesUp ? 1 : -1;
      this.sortPagesUp = !this.sortPagesUp;
      key = "numberOfPages";
    }

    if (sort == "section") {
      descOrAsc = this.sortSectionUp ? 1 : -1;
      this.sortSectionUp = !this.sortSectionUp;
      key = "section";
    }
    return { [key]: descOrAsc };
  }

  static getSearchObject(search) {
    return !search ? {} : { name: new RegExp(search, "i") };
  }
  /* END Search and Sort Using JS*/

  //////////////////////////////////////

  /* START Search and Sort Using JS*/
  static searchBooksByName(search, books) {
    return books.filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase())
    );
  }

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
    try {
      const _id = new ObjectId(req.params.id);
      connection((db) => {
        db.collection("books")
          .findOne({ _id: _id })
          .then((book) => {
            res.render("showBook", { pageTitle: "Book Details", book });
          })
          .catch((err) => this.renderError(res, err.message));
      });
    } catch (err) {
      return this.renderError(res, err.message);
    }
  };

  static addBook = (req, res) => {
    res.render("addBook", { pageTitle: "Create New Book" });
  };

  static addBookLogic = (req, res) => {
    const newBook = Book.mapObjectToBook(req.body);
    try {
      connection((db) => {
        db.collection("books")
          .insertOne(newBook)
          .then((_) => {
            res.redirect("/");
          })
          .catch((err) => this.renderError(res, err.message));
      });
    } catch (err) {
      return this.renderError(res, err.message);
    }
  };

  static editBook = (req, res) => {
    const _id = new ObjectId(req.params.id);
    try {
      connection((db) => {
        db.collection("books")
          .findOne({ _id: _id })
          .then((book) => {
            console.log(book);
            res.render("editBook", { pageTitle: "Edit Book", book });
          })
          .catch((err) => this.renderError(res, err.message));
      });
    } catch (err) {
      return this.renderError(res, err.message);
    }
  };

  static editBookLogic = (req, res) => {
    const _id = new ObjectId(req.params.id);
    const updatedBook = Book.mapObjectToBook(req.body);

    try {
      connection((db) => {
        db.collection("books")
          .updateOne({ _id: _id }, { $set: updatedBook })
          .then((book) => {
            res.redirect(`/`);
          })
          .catch((err) => this.renderError(res, err.message));
      });
    } catch (err) {
      return this.renderError(res, err.message);
    }
  };

  static deleteBook = (req, res) => {
    const _id = new ObjectId(req.params.id);

    try {
      connection((db) => {
        db.collection("books")
          .deleteOne({ _id: _id })
          .then((book) => {
            res.redirect(`/`);
          })
          .catch((err) => this.renderError(res, err.message));
      });
    } catch (err) {
      return this.renderError(res, err.message);
    }
  };

  static renderError(res, message = "Book Not Found") {
    return res.render("err404", {
      pageTitle: `Error 404, Book Not Found`,
      err: "Book Not Found",
    });
  }
}

module.exports = BookController;
