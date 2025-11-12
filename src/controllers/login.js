const bcrypt = require("bcryptjs")
const User = require("../models/user")


const userLogin = async (req,res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        if(!email || !password){
          return  res.status(400).json({message : "Please enter the all fields" })
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({ message : "Email is not registered" })
        }
        const matchpassword = await bcrypt.compareSync(password,user.password)
        if(!matchpassword){
            return res.status(401).json({code : "401" ,  message : "Incorrecet password" })
        }
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

module.exports = userLogin