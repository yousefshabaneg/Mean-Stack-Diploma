const { MongoClient } = require("mongodb");

const dbUrl = process.env.dbUrl;
const dbName = process.env.dbName;

const myConnection = (connection) => {
  MongoClient.connect(dbUrl, (error, client) => {
    if (error) return console.log("db Error: " + error.message);

    const db = client.db(dbName);
    db.collection("books").createIndex({
      name: "text",
    });
    connection(db);
  });
};

module.exports = myConnection;
