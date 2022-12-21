const BookComparer = require("./book.comparer");
class Book extends BookComparer {
  constructor(name, section, numberOfPages, id) {
    super();
    this.id = id || +`${new Date().getTime()}`.slice(7);
    this.name = name;
    this.section = section;
    this.numberOfPages = +numberOfPages;
  }

  static mapObjectToBook(obj) {
    return new Book(obj.name, obj.section, obj.numberOfPages, obj.id);
  }

  static mapListToBooks(list) {
    return list.map((b) => this.mapObjectToBook(b));
  }
}

module.exports = Book;
