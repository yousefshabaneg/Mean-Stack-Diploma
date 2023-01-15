const heads = ["title", "content", "email", "date"];

const addTask = document.querySelector("#addTask");
const tableBody = document.querySelector("tbody");

const readDataFromStorage = (itemKey = "tasks", resType = "json") => {
  let data = localStorage.getItem(itemKey);
  if (resType === "json") {
    try {
      data = JSON.parse(data) || [];
    } catch (e) {
      data = [];
    }
  }
  return data;
};

const writeDataToStorage = (data, itemKey = "tasks") => {
  localStorage.setItem(itemKey, JSON.stringify(data));
};

function loadDataToTable() {
  const data = readDataFromStorage();
  if (!data && Array.isArray(data)) return;

  data.forEach((todoItem) => {
    this.insertItemToTable(todoItem);
  });
}

loadDataToTable();

addTask.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = {};
  heads.forEach((h) => (task[h] = addTask.elements[h].value));

  const data = readDataFromStorage();
  data.push(task);
  writeDataToStorage(data);
  insertItemToTable(task);
});

function insertItemToTable(todoItem) {
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
