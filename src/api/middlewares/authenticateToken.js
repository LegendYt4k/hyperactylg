import settings from "../../../settings.js";
import log from "../../helpers/logger.js";
const AuthenticateToken = async(req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader ? authHeader.split(" ")[1] : null
    if(token != settings.secret) return res.status(401).json({message: "Unauthorized"})
    next();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    log.error(err);
    return
  }
};

export default AuthenticateToken