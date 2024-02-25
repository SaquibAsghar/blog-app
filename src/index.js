import "dotenv/config";
import path from "path";
import chalk from "chalk";
import express from "express";
import routeUser from "../routes/user/routeUser.js";
import connectDB from "../DBConnection.js";

const app = express();
const PORT = process.env.PORT || 8001;

await connectDB()
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/", routeUser);
app.use("/user", routeUser);

app.listen(PORT, () =>
  console.log(
    chalk.bgGreen.inverse(
      `Server listening on ${PORT} -${Date().toLocaleString()}`
    )
  )
);
