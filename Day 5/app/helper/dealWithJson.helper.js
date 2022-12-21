const fs = require("fs");

class DealWithJson {
  static readFromJson = () => {
    let data;
    try {
      data = JSON.parse(fs.readFileSync("model/tasks.json"));
    } catch (err) {
      data = [];
    }
    return data;
  };

  static writeToJson = (data) => {
    fs.writeFileSync("model/tasks.json", JSON.stringify(data));
  };
}

module.exports = DealWithJson;
