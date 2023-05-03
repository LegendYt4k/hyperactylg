import express from 'express'
import log from "../../helpers/logger.js";
import settings from '../../../settings.js';
import fetch from 'node-fetch'
const router = express.Router()

router.patch('/', async(req,res) => {
    try {
        if(!req.body /* || typeof req.body != 'object'  */|| !req.body.server || !req.body.token) return res.status(400).json({message: "Please provide all the details."})
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
          const existsServers = userData.panelUser.relationships.servers.data.filter(server => server.attributes.id != req.body.server.id)
          for (
            let i = 0;
            i < existsServers.length;
            i++
          ) {
            usedResources.cpu +=
            existsServers[i].attributes.limits.cpu;
            usedResources.ram +=
            existsServers[
                i
              ].attributes.limits.memory;
            usedResources.disk +=
            existsServers[i].attributes.limits.disk;
            usedResources.servers += 1;
          }
          if((parseInt(usedResources.ram) + parseInt(req.body.server.ram)) > userPackage.ram || (parseInt(usedResources.cpu) + parseInt(req.body.server.cpu)) > userPackage.cpu || (parseInt(usedResources.disk) + parseInt(req.body.server.disk)) > userPackage.disk) return res.status(400).json({message:"Looks like you are trying to use more resources than available in your package."})
          const server = userData.panelUser.relationships.servers.data.filter(server => server.attributes.id == req.body.server.id)[0]
          if(!server) return res.status(400).json({message: "Looks like the server does not exists."})
          const limits = {
            memory: req.body.server.ram ? req.body.server.ram : server.attributes.limits.memory,
            disk: req.body.server.disk ? req.body.server.disk : server.attributes.limits.disk,
            cpu: req.body.server.cpu ? req.body.server.cpu : server.attributes.limits.cpu,
            swap: server.attributes.limits.swap,
            io: server.attributes.limits.io
          }
          const rawServerUpdateResp = await fetch(settings.pterodactyl.domain + '/api/application/servers/' + server.attributes.id + '/build', {
            method: "patch",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${settings.pterodactyl.key}`
            },
            body: JSON.stringify({
              limits: limits,
              allocation: server.attributes.allocation,
              feature_limits: server.attributes.feature_limits
            })
          })
          if(rawServerUpdateResp.status != 200) return res.status(500).json({message: "Internal server error please contact an admin."})
          res.status(200).json({message: "Server successfuly updated."})
    } catch(err) {
        log.error(err)
        res.status(500).json({message: "Internal server error please contact an admin."})
    }
})

export default router