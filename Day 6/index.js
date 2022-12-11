/*
    Mongodb i
*/

const data = [
  { id: 474173, name: "Javascript", section: "Technology", numberOfPages: 640 },
  {
    id: 616507,
    name: "Clean Code",
    section: "Software Engineering",
    numberOfPages: 462,
  },
  {
    id: 653195,
    name: "Head First Object-Oriented Analysis and Design",
    section: "OBJECT-ORIENTED PROGRAMMING",
    numberOfPages: 634,
  },
  {
    id: 608489,
    name: "Grokking Machine Learning",
    section: "AI & DATA SCIENCE",
    numberOfPages: 513,
  },
  {
    id: 632899,
    name: "Introduction to Machine Learning with Python",
    section: "AI & DATA SCIENCE",
    numberOfPages: 390,
  },
  {
    id: 705573,
    name: "JavaScript from Frontend to Backend",
    section: "Technology",
    numberOfPages: 336,
  },
  {
    id: 261242,
    name: "The Clean Coder",
    section: "Technology",
    numberOfPages: 652,
  },
  {
    id: 870516,
    name: "Mechelle Lynn",
    section: "Dolor qui minima ull",
    numberOfPages: 726,
  },
];

const { MongoClient } = require("mongodb");
const dburl = "mongodb://localhost:27017";
const dbName = "ODC-1";

MongoClient.connect(dburl, async (error, client) => {
  if (error) return console.log("db Error");

  const db = client.db(dbName);
  db.collection("books")
    .find()
    .toArray((err, res) => {
      if (err) return console.error(err.message);

      console.log(res);
    });

  // try {
  // const res = await db.collection("tasks").insertMany(data);
  // console.log(res);
  // } catch (err) {
  // console.err(err);
  // } finally {
  // client.close();
  // }
});
