require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const apiRoutes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("<h1> Social Network API </h1>");
});

app.use("/api", apiRoutes);

app.use("*", (req, res) => {
  res.status(404).send("<h1> Route does not exist! </h1>");
});

const startApp = async () => {
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/social-network-api",
    {
      // useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  app.listen(PORT, () => console.log(` Connected on localhost:${PORT}`));
};

startApp();
