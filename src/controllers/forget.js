const User = require("../models/user");
const axios = require("axios"); 
const userForget = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (email && !otp) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Please enter registered email" });
      }

      const genotp = Math.floor(100000 + Math.random() * 900000);
      user.otp = genotp;
      await user.save();

      const brevoApiKey = process.env.BREVO_API_KEY;
      const emailData = {
        sender: {
          name: "Reset Flow",
          email: process.env.SENDER_EMAIL, 
        },
        to: [
          {
            email: email, 
          },
        ],
        subject: "Your OTP for Password Reset",
        htmlContent: `
          <div style="font-family:Arial; padding:10px;">
            <h2>OTP Verification</h2>
            <p>Your OTP for password reset is:</p>
            <h1 style="color:#5A55E3">${genotp}</h1>
          </div>
        `,
      };

      try {
        await axios.post("https://api.brevo.com/v3/smtp/email", emailData, {
          headers: {
            "api-key": brevoApiKey, 
            "content-type": "application/json",
          },
        });
      } catch (emailError) {
        console.error("Error sending email with Brevo:", emailError.response ? emailError.response.data : emailError.message);
        return res.status(500).json({ message: "Error sending email" });
      }

      return res.status(200).json({ code: 200, message: "OTP sent successfully" });
    }

    if (email && otp) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Email not found" });
      }

      if (user.otp == otp) {
        await user.save();
        return res.status(200).json({ code: 200, message: "OTP verified successfully" });
      } else {
        return res.status(401).json({ message: "Incorrect OTP" });
      }
    }

    return res.status(400).json({ message: "Invalid request" });

  } catch (error) {
    console.log(" Error in forget controller:", error); 
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = userForget;