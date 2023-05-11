import express, { Router } from "express";
import userModel from "../../models/Users.js";
import jwt from "jsonwebtoken";
import settings from "../../../settings.js";
import log from "../../helpers/logger.js";
import fetch from "node-fetch";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (
      !req.body ||
      typeof req.body != "object" ||
      !req.body.server ||
      !req.body.token
    )
      return res.status(400).json({ message: "Bad Request" });
    const rawUserData = await fetch(
      settings.client.domain + "/api/users/getUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + settings.secret,
        },
        body: JSON.stringify({
          token: req.body.token,
        }),
      }
    );
    const userData = await rawUserData.json();
    if (!userData) return res.status(401).json({ message: "Unauthorized" });
    const userPackage = settings.packages.list[userData.user.Package];
    if (!userPackage) return res.status(401).json({ message: "Unauthorized" });

    const usedResources = {
      ram: 0,
      disk: 0,
      cpu: 0,
      servers: 0,
    };
    for (
      let i = 0;
      i < userData.panelUser.relationships.servers.data.length;
      i++
    ) {
      usedResources.cpu +=
        userData.panelUser.relationships.servers.data[i].attributes.limits.cpu;
      usedResources.ram +=
        userData.panelUser.relationships.servers.data[
          i
        ].attributes.limits.memory;
      usedResources.disk +=
        userData.panelUser.relationships.servers.data[i].attributes.limits.disk;
      usedResources.servers += 1;
    }
    if((parseInt(usedResources.ram) + parseInt(req.body.server.ram)) > userPackage.ram || (parseInt(usedResources.cpu) + parseInt(req.body.server.cpu)) > userPackage.cpu || (parseInt(usedResources.disk) + parseInt(req.body.server.disk)) > userPackage.disk || parseInt(usedResources.servers) + 1 > userPackage.servers) return res.status(400).json({message:"Looks like you are trying to use more resources than available in your package."})
    if (
      Object.entries(settings.locations).filter(
        (value) => value[0] == req.body.server.location
      ).length != 1
    )
      return res.status(400).json({
        message: "Looks Like The Location You Selected Does Not Exists.",
      });
    const egg = settings.eggs[req.body.server.egg].info;
    if (!egg)
      return res
        .status(400)
        .json({
          message: "Looks like the egg you are trying to use does not exists.",
        });
    const specs = egg;
    specs.name = req.body.server.name;
    specs.user = userData.panelUser.id;
    specs["feature_limits"] = {
      databases: 4,
      backups: 1,
    };
    specs.deploy = {
      locations: [req.body.server.location],
      dedicated_ip: false,
      port_range: [],
      allocation: {
        default: true,
      },
    };
    specs.limits = {
      swap: 0,
      io: 500,
      memory: req.body.server.ram,
      disk: req.body.server.disk,
      cpu: req.body.server.cpu,
    };
    const rawServerCreateResp = await fetch(
      settings.pterodactyl.domain + "/api/application/servers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settings.pterodactyl.key}`,
          Accept: "application/json",
        },
        body: JSON.stringify(specs),
      }
    );
    if (rawServerCreateResp.status != 201)
      return res
        .status(500)
        .json({
          message:
            "An error has occured while trying to create your server please contact an admin.",
        });
    res.status(200).json({ message: "Server has been successfuly created." });
  } catch (err) {
    log.error(err);
    res.status(500).json({ message: "Internal server error please contact an admin." });
  }
});

export default router;
