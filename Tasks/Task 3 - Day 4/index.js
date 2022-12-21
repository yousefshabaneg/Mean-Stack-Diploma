/*
!Task

صفحه add, edit, showall , show single لل hbs 
عشان نكمل عليهم و نعمل nav ينقل بينهم

*/
//Requires.
require("dotenv").config();
const app = require("./app/src");

//Variables.
const PORT = process.env.PORT || 5000;

//Logic.
app.listen(PORT, () => console.log("http://localhost:3000"));
