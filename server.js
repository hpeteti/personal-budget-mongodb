// "mongodb://127.0.0.1:27017"; mongo
const mongoose = require("mongoose");
const budgetModel = require("./models/budget_model.js");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use("/", express.static("public"));

app.get("/budget", (req, res) => {
  mongoose.connect("mongodb://127.0.0.1:27017/chart", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the Database");
    budgetModel.find({})
      .then((data) => {
        res.json(data);
        console.log(data);
        mongoose.connection.close();
      })
      .catch((connectionError) => {
        console.error(connectionError);
      });
  })
  .catch((err) => {
    console.error(err);
  });
});


app.post("/budget", (req, res) => {
  mongoose.connect("mongodb://127.0.0.1:27017/chart", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");

    const data = req.body;

    // Use Promise.all to create and save all budget items
    Promise.all(data.map(itemData => {
      const newItem = new budgetModel(itemData);
      return newItem.save();
    }))
      .then((savedItems) => {
        // res.json(savedItems);
        res.json('successfully added data');
        console.log(savedItems);
        mongoose.connection.close();
      })
      .catch((connectionError) => {
        console.error(connectionError);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  });
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});