const tableBody = document.querySelector("tbody");

const titleEl = document.querySelector("#title");
const contentEl = document.querySelector("#content");
const emailEl = document.querySelector("#email");
const dateEl = document.querySelector("#due-date");
const btnAdd = document.querySelector(".btn-add");

const startDateEl = document.querySelector("#start-date");
const endDateEl = document.querySelector("#end-date");
const btnFilter = document.querySelector(".btn-filter");

// dateEl.min = new Date().toISOString().split("T")[0];
// console.log(dateEl.value);

class Todo {
  constructor(title, content, email, date) {
    this.title = title;
    this.content = content;
    this.email = email;
    this.date = date;
  }

  static getLocalStorage = function () {
    const data = JSON.parse(localStorage.getItem("todoList"));
    console.log(data);
    return data;
  };

  static insertHtmlTodoItem(todoItem) {
    const html = `
    <tr>
      <td>${todoItem.title}</td>
      <td>${todoItem.content}</td>
      <td>${todoItem.email}</td>
      <td>${todoItem.date}</td>
    </tr>
  `;
    tableBody.insertAdjacentHTML("beforeend", html);
  }

  static setLocalStorage = function () {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  static addItemToDoc(todoItem) {
    this.setLocalStorage();
  }

  static loadLocalStorage(todoList) {
    if (!todoList) return;

    todoList.forEach((todoItem) => {
      this.insertHtmlTodoItem(todoItem);
    });
  }
}

const todoList = Todo.getLocalStorage() ?? [];

Todo.loadLocalStorage(todoList);

console.log("Todo List", todoList);
btnAdd.addEventListener("click", function (e) {
  const todoItem = new Todo(
    titleEl.value,
    contentEl.value,
    emailEl.value,
    dateEl.value
  );

  todoList.push(todoItem);

  Todo.addItemToDoc(todoItem);
});

btnFilter.addEventListener("click", filterTodoList);

function filterTodoList() {
  let filteredTodo = todoList.filter(dateCondition);

  console.log(filteredTodo);
  if (!filteredTodo) return;

  tableBody.innerHTML = "";

  filteredTodo.forEach((todoItem) => {
    Todo.insertHtmlTodoItem(todoItem);
  });
}

function dateCondition(item) {
  return item.date >= startDateEl.value && item.date <= endDateEl.value;
}
