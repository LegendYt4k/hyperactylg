import express from "express";
import userModel from "../../models/Users.js";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import settings from '../../../settings.js'
import log from "../../helpers/logger.js"

const SECRET = settings.secret
const router = express.Router();

router.post('/login', async(req,res) => {
    try {
        if (!req.body || typeof req.body != "object" || !req.body.Email ||!req.body.Password) return res.status(400).json({ message: "Please provide valid details" });
        const user = await userModel.findOne({
            Email: req.body.Email,
            Password: req.body.Password
        })
        if(!user) return res.status(401).json({message:"Please provide a valid email and password."})
        if(user.Password != req.body.Password) return res.status(401).json({message:"Please provide a valid email and password."})
        const usersRaw = await fetch(
            settings.pterodactyl.domain + "/api/application/users",
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:
                  "Bearer " + settings.pterodactyl.key,
              },
            })
        const panelUsers = await usersRaw.json()
        const panelUser = panelUsers.data.filter(panelUser => panelUser.attributes.email == user.Email)[0]
        if(!panelUser) {
            await userModel.findByIdAndDelete(user.id)
            log.debug(`User ${user.Email} was not found in panel, deleted from database`)
            return res.status(401).json({message:"Please provide a valid email or password."})
        }
        const token = jwt.sign({user:{id:user.id}}, SECRET)
        res.status(200).json({token: token})
    } catch(err) {
        log.error(err)
        res.status(500).json({messaeg:"Internal server error please contact an admin."})
    }
})
export default router;
