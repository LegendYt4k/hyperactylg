import userModel from "../../models/Users.js"
import log from "../../helpers/logger.js"

const userList = async(req,res) => {
    try {
        const users = await userModel.find()
        res.status(200).json({total: users.length, data: users})
    } catch(err) {
        log.error(err)
        res.status(500).json({message: "Internal server error."})
    }
}

export default userList