const mongoclient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
mongoclient
  .connect(
    "mongodb+srv://dev5:focus1234@cluster0.9vkcp.mongodb.net/marvels-quotes?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
    }
  )

  .then((client) => {
    console.log("Connected to databases");
    const db = client.db("marvels-quotes");
    const writeUps = db.collection("blogs");
    app.set("view engine", "ejs");

    app.get("/", function (req, res) {
      res.render("index.ejs");
    });
    app.set("views", __dirname + "/views");
    app.get("/write-a-blog", function (req, res) {
      res.render("write.ejs");
    });
    app.get("/blogs", (req, res) => {
      writeUps
        .find()
        .toArray()
        .then((result) => {
            console.log(result)
          res.render('blogs',{Blogs:result})
        });
    });
    app.post("/blogs", (req, res) => {
      writeUps
        .insertOne(req.body)
        .then((result) => {
          writeUps
            .find()
            .toArray()
            .then((result) => {
              res.render("blogs", { Blogs: result });
            })
            .catch((errr) => console.log(err));
        })
        .catch((error) => console.log(error));
    });
    app.post("/blogsupdate", function (req, res) {
        console.log(req.body)
      var myquery = {
        Name: req.body.NameId,
        Topic: req.body.TopicId,
        WriteUp: req.body.TextId,
        Likes: parseFloat(req.body.LikeId),
      };

      var newvalues = { $set: { Likes: parseFloat(req.body.LikeId) + 1 } };
      writeUps.updateOne(myquery, newvalues, function (err, response) {
        if (err) throw err;
        writeUps
          .find()
          .toArray()
          .then((result) => {
            res.render("blogs", { Blogs: result });
          })

          .catch((error) => {
            console.error(error);
          });

        console.log("document updated");
      });
    });

    app.post("/blogs", function (req, res) {
      writeUps
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/blogs");
        })

        .catch((error) => {
          console.error(error);
        });
    });
  });

app.listen(port, function (req, res) {
  console.log("server is running");
});
