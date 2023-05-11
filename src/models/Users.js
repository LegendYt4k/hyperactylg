import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    Username: String,
    Email: String,
    Password: String,
    Type: String,
    Package: String,
    Coins: Number
})

const userModel = mongoose.model("hyperactyl users", userSchema)

export default userModel