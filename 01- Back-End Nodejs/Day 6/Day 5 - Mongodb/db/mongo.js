const { MongoClient } = require("mongodb");

const dburl = process.env.dburl;
const dbName = process.env.dbName;

const myConnection = (connection) => {
  MongoClient.connect(dburl, (error, client) => {
    if (error) return console.log("db Error: " + error.message);

    const db = client.db(dbName);
    connection(db);
  });
};

module.exports = myConnection;
