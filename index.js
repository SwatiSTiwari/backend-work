const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const Model = require("./model/movie");

const app = express();

app.use(express.json());
var database;

app.get("/", (req, res) => {
  res.send("welcome from swati tiwari");
});

app.get("/api/v1/longest-duration-movies", (req, res) => {
  var mysort = { runtimeMinutes: -1 }; // it will display the data based on longest runtiimeMinutes
  var limit = 10;
  database
    .collection("movie")
    .find({})
    .sort(mysort)
    .limit(limit)
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// #########  averageRating>6.0 is not working in nodejs ############

// app.get("/api/v1/top-rated-movies", (req, res) => {
//   var mysort1 = { averageRating: -1 };
//   database
//     .collection("rating")
//     .find({ $gt: 6.0 })
//     .sort(mysort1)
//     .toArray((err, result) => {
//       if (err) throw err;
//       res.send(result);
//     });
// });

// adding new data by using post request
app.post("/api/v1/new-movie", (req, res) => {
  const data = new Model({
    tconst: req.body.tconst,
    title_type: req.body.title_type,
    primary_title: req.body.primary_title,
    runtimeMinutes: req.body.runtimeMinutes,
    genres: req.body.genres,
  });

  res.status(200).json({
    succes: true, // if the data will be inserted successfully then it will give success message in the browser.
  });
});

app.listen(5000, () => {
  MongoClient.connect(
    // connect method is used to connect the database to the nodejs
    "mongodb://localhost:27017",
    { useNewUrlParser: true },
    (err, result) => {
      if (err) throw err;
      database = result.db("datatable");
      console.log("connection successfull"); // successful message when database will be connected will show error if database is not connected
    }
  );
});
