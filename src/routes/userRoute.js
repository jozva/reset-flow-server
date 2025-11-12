const express = require("express")
const route = express.Router()


const userRegister = require("../controllers/register")
const userLogin = require ("../controllers/login")
const userForget = require("../controllers/forgot")
const userReset = require("../controllers/userReset")
const authenticate = require("../utils/auth")



route.post("/register",userRegister)
route.post("/login",userLogin)
route.post("/forget",userForget)
route.post("/reset", userReset);

module.exports = route ;