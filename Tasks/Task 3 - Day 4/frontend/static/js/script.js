//Elements
const usersForm = document.querySelector("#users-form");
const usersBody = document.querySelector(".users-rows");
const btnDeleteAll = document.querySelector(".btn-delete-all");
const dataContainer = document.querySelector(".dataContainer");
const noData = document.querySelector(".noData");
console.log(usersForm);

usersForm.addEventListener("submit", (e) => {
  e.preventDefault();
  usersForm.elements.forEach((element) => {
    console.log(element);
  });
});
