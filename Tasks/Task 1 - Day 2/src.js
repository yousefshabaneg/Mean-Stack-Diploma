class LocalStorage {
  static readDataFromStorage = function (key) {
    let data = localStorage.getItem(key);
    try {
      data = JSON.parse(data) || [];
    } catch (e) {
      console.error(error);
      data = [];
    }
    return data;
  };

  static writeDataToStorage = function (key, data) {
    if (!data || !key) {
      console.error("Data and Key are required to write to localStorage");
      return;
    }
    localStorage.setItem(key, JSON.stringify(data));
  };
}

class User {
  constructor(name, age, status, id) {
    this.id = id || +`${new Date().getTime()}`.slice(7, 11);
    this.name = name;
    this.age = age;
    this.status = status ? "active" : "inactive";
  }

  getUserStatus() {
    return this.status === "active" ? true : false;
  }

  toggleStatus() {
    this.status = this.getUserStatus() ? "inactive" : "active";
  }

  static getUserStatus(status) {
    return status === "active" ? true : false;
  }

  convertUserToHtml() {
    return `
    <tr data-id="${this.id}">
              <td>${this.id}</td>
              <td>${this.name}</td>
              <td>${this.age}</td>
              <td><input ${
                this.getUserStatus() ? "checked" : ""
              } type="checkbox" id="user${this.id}"/></td>
              <td><button class="btn btn-delete">Delete</button></td>
   </tr>
   `;
  }

  static mapObjectToUser(obj) {
    return new User(obj.name, obj.age, this.getUserStatus(obj.status), obj.id);
  }

  static mapListToUsers(list) {
    return list.map((u) => this.mapObjectToUser(u));
  }

  static mapLocalStorageToUsers() {
    return this.mapListToUsers(LocalStorage.readDataFromStorage(usersKey));
  }
}

//Variables
const usersKey = "users";
const heads = ["name", "age"];
let users = User.mapLocalStorageToUsers();

//Elements
const usersForm = document.querySelector("#users-form");
const usersBody = document.querySelector(".users-rows");
const btnDeleteAll = document.querySelector(".btn-delete-all");
const dataContainer = document.querySelector(".dataContainer");
const noData = document.querySelector(".noData");

usersForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const userObj = {};

  dataContainer.style.display = "block";
  noData.style.display = "none";

  heads.forEach((h) => (userObj[h] = usersForm.elements[h].value));
  const user = new User(userObj.name, userObj.age);

  users.push(user);
  LocalStorage.writeDataToStorage(usersKey, users);

  usersBody.innerHTML += user.convertUserToHtml();
  usersForm.reset();
});

const renderUsers = () => {
  if (!users.length) {
    dataContainer.style.display = "none";
    noData.style.display = "block";
  }
  usersBody.innerHTML = "";
  users.forEach((u) => (usersBody.innerHTML += u.convertUserToHtml()));
};

usersBody.addEventListener("click", function (e) {
  if (!e.target.matches("button") && !e.target.matches("input")) return;

  const tr = e.target.closest("tr");
  const userId = +tr.dataset.id;
  const user = users.find((u) => u.id == userId);
  if (!user) return;

  if (e.target.matches("button")) {
    users = users.filter((u) => u.id != userId);
  }

  if (e.target.matches("input")) {
    const id = users.findIndex((u) => u.id == userId);
    users[id].toggleStatus();
  }

  LocalStorage.writeDataToStorage(usersKey, users);
  renderUsers();
});

btnDeleteAll.addEventListener("click", (e) => {
  if (!users.length) return;
  users = [];
  localStorage.removeItem(usersKey);
  renderUsers();
});

renderUsers();
