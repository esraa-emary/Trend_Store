const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

mongoose
  .connect("mongodb+srv://ammarqamardev_db_user:e8bAb6penUCUAmiu@cluster0.6wh8wmw.mongodb.net/TREND")
  .then(() => {
    console.log("MongoDB connected");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });