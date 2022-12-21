class BookComparer {
  static compareBookName(a, b) {
    return this ? b.name - a.name : a.name - b.name;
  }

  static compareBookSection(a, b) {
    return this ? b.section - a.section : a.section - b.section;
  }

  static compareBookPages(a, b) {
    return this
      ? b.numberOfPages - a.numberOfPages
      : a.numberOfPages - b.numberOfPages;
  }
}

module.exports = BookComparer;
