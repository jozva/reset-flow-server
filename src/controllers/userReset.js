const User = require("../models/user");
const bcrypt = require("bcryptjs")

const userReset = async (req, res) => {
  try {
    const { email, cnfPassword } = req.body;
    if (!email || !cnfPassword) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // const user = await User.findOne({email})
    const otp = user.otp
    if (otp == null) {
      res.status(400).json({ message: "not authorised", code: 400 })
    }
    else {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(cnfPassword, salt)
      user.password = hash;
      user.otp = undefined;
      await user.save();
      res.status(200).json({ code: 200, message: "Password reset successful" });

    }

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = userReset;
