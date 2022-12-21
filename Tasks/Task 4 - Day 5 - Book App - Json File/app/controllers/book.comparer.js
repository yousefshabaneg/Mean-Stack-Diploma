class BookComparer {
  static compareBookName(a, b) {
    if (this) {
      if (b.name < a.name) {
        return -1;
      }
      if (b.name > a.name) {
        return 1;
      }
    } else {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
    }

    return 0;
  }

  static compareBookSection(a, b) {
    if (this) {
      if (b.section < a.section) {
        return -1;
      }
      if (b.section > a.section) {
        return 1;
      }
    } else {
      if (a.section < b.section) {
        return -1;
      }
      if (a.section > b.section) {
        return 1;
      }
    }
    return 0;
  }

  static compareBookPages(a, b) {
    if (this) {
      if (b.numberOfPages < a.numberOfPages) {
        return -1;
      }
      if (b.numberOfPages > a.numberOfPages) {
        return 1;
      }
    } else {
      if (a.numberOfPages < b.numberOfPages) {
        return -1;
      }
      if (a.numberOfPages > b.numberOfPages) {
        return 1;
      }
    }

    return 0;
  }
}

module.exports = BookComparer;
