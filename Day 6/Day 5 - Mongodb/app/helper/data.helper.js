class Data {
  static getId = (arr, key, val) => {
    arr.findIndex((el) => el[key] == val);
  };
}

module.exports = Data;
