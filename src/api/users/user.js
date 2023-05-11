import express from "express";
import userModel from "../../models/Users.js";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import settings from "../../../settings.js";
import log from "../../helpers/logger.js";
import userList from "./userList.js";

const SECRET = settings.secret;
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (
      !req.body ||
      typeof req.body != "object" ||
      !req.body.Email ||
      !req.body.Password ||
      !req.body.Username
    )
      return res.status(400).json({ message: "Please provide valid details." });
    const userExists = await userModel.findOne({
      Email: req.body.Email,
    });
    if (userExists)
      return res
        .status(403)
        .json({ message: "An user with that email already exists." });
    const tag = Math.floor(Math.random() * 10000);
    const accountResp = await fetch(
      settings.pterodactyl.domain + "/api/application/users",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + settings.pterodactyl.key,
        },
        body: JSON.stringify({
          email: req.body.Email,
          username: `${req.body.Username}-${tag}`,
          first_name: req.body.Username,
          last_name: `${tag}`,
          password: req.body.Password,
        }),
      }
    );
    if (accountResp.status == 201) {
      const newUser = new userModel({
        Username: req.body.Username,
        Email: req.body.Email,
        Password: req.body.Password,
        Type: "email",
        Package: settings.packages.default,
        Coins: 0,
      });
      await newUser.save();
      const token = await jwt.sign({ user: { id: newUser.id } }, SECRET);
      res.status(200).json({ token: token });
    } else {
      const usersRaw = await fetch(
        settings.pterodactyl.domain + "/api/application/users",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + settings.pterodactyl.key,
          },
        }
      );
      const users = await usersRaw.json();
      const alreadyExists = users.data.filter(
        (user) => user.attributes.email == req.body.Email
      );
      if (alreadyExists)
        return res
          .status(403)
          .json({ message: "An user with that email already exists." });
      res.status(500).json({
        message: "An error has occured while trying to make your account.",
      });
    }
  } catch (err) {
    log.error(err);
    res.status(500).json({ message: "Internal server error please contact an admin." });
  }
});

/* router.get('/', userList) */

router.post("/getUser", async (req, res) => {
  try {
    if (!req.body || typeof req.body != "object" || !req.body.token)
      return res.status(400).json({ message: "Bad Request" });
    try {
      const data = await jwt.verify(req.body.token, SECRET);
      req.user = data.user;
    } catch (err) {
      req.user = null;
    }
    if (!req.user) return res.status(400).json({ message: "Bad Request" });
    const user = await userModel.findById(req.user.id);
    if (!user) return res.status(400).json({ message: "Bad Request" });
    const usersRaw = await fetch(
      settings.pterodactyl.domain + "/api/application/users?include=servers",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + settings.pterodactyl.key,
        },
      }
    );
    const panelUsers = await usersRaw.json();
    const panelUser = panelUsers.data.filter(
      (panelUser) => panelUser.attributes.email == user.Email
    )[0];
    if (!panelUser) return res.status(400).json({ message: "Bad Request" });
    res.status(200).json({ user: user, panelUser: panelUser.attributes });
  } catch (err) {
    log.error(err);
    res.status(500).json({ message: "Internal server error please contact an admin." });
  }
});
export default router;
