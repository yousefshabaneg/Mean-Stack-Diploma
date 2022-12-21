const router = require("express").Router();
const bookController = require("../controllers/book.controller");

router.get("/", bookController.allBooks);

// router.get("/searchInBooks", bookController.searchInBooks);

// router.get("/sortBooks/:sortBy", bookController.sortBooks);

router.get("/showBook/:id", bookController.showBook);

router.get("/addBook", bookController.addBook);
router.post("/addBook", bookController.addBookLogic);

router.get("/editBook/:id", bookController.editBook);
router.post("/editBook/:id", bookController.editBookLogic);

router.get("/deleteBook/:id", bookController.deleteBook);

module.exports = router;
