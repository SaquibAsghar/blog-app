import { Router } from "express";
import User from "../../models/users/users.model.js";

const routeUser = Router();

routeUser.route("/signin").get((req, res) => {
  res.render("view-signin/signin");
});

routeUser
  .route("/signup")
  .get((req, res) => {
    res.render("view-signup/signup");
  })
  .post(async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
      console.log({
        fullName,
        email,
        password,
      });
      const isUserExist = await User.findOne({ email });
      console.log("isUserExist", isUserExist);
      if (isUserExist) {
        res.json({
          msg: "User already exists",
        });
        return;
      }
      const userCreated = await User.create({
        fullName,
        email,
        password,
      });
      console.log("userCreated", userCreated);
      if (!userCreated) res.json({ msg: "User creation failed" });
      return res.redirect("/");
    } catch (error) {
      console.log("[ERROR]: ", error.message);
      res.json({
        msg: error.message,
      });
    }
  });

// routeUser.post();

export default routeUser;
