heads = [
  { key: "id", default: Date.now() },
  { key: "name", default: null },
  { key: "age", default: null },
  { key: "email", default: null },
  { key: "status", default: false },
];
const deal = require("./deal.module");
class User {
  static getData() {
    return deal.readFromJson();
  }

  static getUserById(id) {
    return this.getData().find((u) => u.id == id);
  }

  static add(data) {
    const user = {};
    heads.forEach((head) => {
      if (head.default != null) user[head.key] = head.default;
      else user[head.key] = data[head.key];
    });
    console.log(user);
    const all = deal.readFromJson();
    all.push(user);
    deal.writeToJson(all);
  }
  static showAll() {
    const data = this.getData().map((u) => {
      const newUser = {};
      heads.forEach((h) => (newUser[h.key] = u[h.key]));
      return newUser;
    });
    console.log(data);
  }

  static showSingle(args) {
    const { id } = args;
    if (!id) {
      console.log("Id is not correct.");
      return;
    }

    const user = this.getUserById(id);

    if (!user) {
      console.log("Id is not exist.");
      return;
    }

    console.log(user);
  }

  static edit(args) {
    const { id } = args;

    if (!id) {
      console.log("Id is not correct.");
      return;
    }

    const user = this.getUserById(id);

    if (!user) {
      console.log("Id is not exist.");
      return;
    }

    heads.forEach((h) => {
      if (args[h.key]) user[h.key] = args[h.key];
    });

    const data = this.getData();
    const userIndex = data.findIndex((u) => u.id == id);
    data[userIndex] = user;
    deal.writeToJson(data);

    console.log("User Is Updated");
  }

  static del(args) {
    const { id } = args;

    if (!id) {
      console.log("Id is not correct.");
      return;
    }

    const user = this.getUserById(id);

    if (!user) {
      console.log("Id is not exist.");
      return;
    }

    const data = this.getData().filter((u) => u.id != id);
    deal.writeToJson(data);

    console.log("User Is Deleted");
  }
}
module.exports = User;
