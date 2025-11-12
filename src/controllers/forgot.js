// const User = require("../models/user")

// const userForget = async (req, res) => {
//     try {
//         const email = req.body.email
//         if (!email) {
//             return res.status(401).json({ message: "Please enter the mail" })
//         }
//         const user = await User.findOne({ email })
//         if (!user) {
//             return res.status(400).json({ message: "Please enter register email" })
//         }
//         const genotp = Math.floor(100000 + Math.random() * 900000);
//         user.otp = genotp
//         await user.save()
//         console.log(user)

//         const userotp = req.body.otp
      
//         // const userotp = req.body.otp

//         if(!userotp){
//           return res.status(401).json({message:"Please enter the otp"})  
//         }
//         const otpMatch = await User.findOne({userotp})
//         if (!otpMatch) {
//             return res.status(401).json({message:"Incorrect OTP"})
//         }
//         alert("OTP verified")
//         res.status(200).json({ code: 200, message: "Success" })
//     } catch (error) {
//         console.log(error)
//     }
// }

// module.exports = userForget


const User = require("../models/user");
const nodemailer = require("nodemailer");

const userForget = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1️⃣ When only email given — Generate and send OTP
    if (email && !otp) {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Please enter registered email" });
      }

      const genotp = Math.floor(100000 + Math.random() * 900000);
      user.otp = genotp;
      await user.save();


      // Create transporter for Gmail
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASSWORD,
        },
      });

      // Mail content
      const mailOptions = {
        from: '"Reset Flow" kingsonjozva@gmail.com',
        to: email,
        subject: "Your OTP for Password Reset",
        html: `
          <div style="font-family:Arial; padding:10px;">
            <h2>OTP Verification</h2>
            <p>Your OTP for password reset is:</p>
            <h1 style="color:#5A55E3">${genotp}</h1>
          </div>
        `,
      };

      // Send mail
      await transporter.sendMail(mailOptions);

      return res.status(200).json({ code: 200, message: "OTP sent successfully" });
    }

    // 2️⃣ When email + otp given — verify OTP
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

    // If both missing
    return res.status(400).json({ message: "Invalid request" });

  } catch (error) {
    console.log("❌ Error in forget controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = userForget;