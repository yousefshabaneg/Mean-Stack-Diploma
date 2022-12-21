const fs = require("fs");

class DealWithJson {
  static readFromJson = () => {
    let data;
    try {
      data = JSON.parse(fs.readFileSync("model/books.json"));
    } catch (err) {
      data = [];
    }
    return data;
  };

  static writeToJson = (data) => {
    fs.writeFileSync("model/books.json", JSON.stringify(data));
  };
}

module.exports = DealWithJson;
