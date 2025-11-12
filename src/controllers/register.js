const express = require("express")
const app = express()
const bcrypt = require("bcryptjs")


const User = require("../models/user")


const userRegister =  async (req, res) => {
    try {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        if(!username || !email || !password){
            return res.status(401).json({ message : "Please fill the all fields" })
        }

        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(401).json({ message : "User is already registered" })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        const user = new User(
            {
                username: username,
                email: email,
                password: hash,
            }
        )
        await user.save()
        res.json(user)
    } catch (error) {
        console.log(error)
    }
} 
module.exports = userRegister ;