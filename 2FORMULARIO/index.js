const express = require("express");
const app = express();
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

MongoClient.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    err ? console.log(err) : (db = client.db("formulario"));
  }
);

//---------------------GET---------------------
app.get("/api/series", function (req, res) {
  db.collection("formulario")
    .find()
    .toArray(function (err, data) {
      err
        ? res.send({ error: true, contenido: err })
        : res.send({ error: false, contenido: data });
    });
});
//--------------------------------------------

//---------------------GET---------------------
app.get("/api/serie", function (req, res) {
  db.collection("formulario")
    .find({ titulo: { $regex: `${req.query.titulo}` } })
    .toArray(function (err, data) {
      err
        ? res.send({ error: true, contenido: err })
        : res.send({ error: false, contenido: data });
    });
});
//--------------------------------------------

//---------------------POST-------------------
app.post("/api/nuevaSerie", function (req, res) {
  db.collection("formulario").insertOne(req.body, function (err, data) {
    err
      ? res.send({ error: true, contenido: err })
      : res.send({ error: false, contenido: data });
  });
});
//--------------------------------------------

app.listen(3000);


