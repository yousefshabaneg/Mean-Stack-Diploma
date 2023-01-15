const moment = require("moment");

class DataHelper {
  static convertDateToString(date) {
    return moment(date).format("YYYY-MM-DD");
  }
}

module.exports = DataHelper;
