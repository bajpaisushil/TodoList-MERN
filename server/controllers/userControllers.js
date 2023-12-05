import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const cookieOptions = {
  secure: true,
  maxAge: 365 * 24 * 60 * 60 * 1000,
  // httpOnly: true,
  // sameSite: 'none'
};

const sendEmailWithNodemailer = (req, res, emailData) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: `${process.env.EMAIL_FROM}`, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      pass: `${process.env.APP_PASS}`, // MAKE SURE THIS PASSWORD IS YOUR GMAIL APP PASSWORD WHICH YOU GENERATED EARLIER
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  const info = transporter
    .sendMail(emailData)
    .then((info) => {
      console.log(`Message sent: ${info.response}`);
      return res.json({
        message: `Email has been sent to ${emailData.to}. Follow the instruction to activate your account`,
      });
    })
    .catch((err) => {
      console.log(`Problem sending email: ${err}`);
    });
  return info;
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "User already registered",
      });
    }
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Account Activation Link",
      html: `
              <h1>Please use the following link to activate your account</h1>
              <h2 style='color: red;'>DO NOT SHARE THIS LINK WITH ANYONE! ELSE WE WILL NOT BE RESPONSIBLE FOR YOUR PRIVACY</h2>
              <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
              `,
    };
    sendEmailWithNodemailer(req, res, emailData);
    return res.status(200).json({
      message: `Account Activation Link has been sent to ${email}`
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Failed to Activate account! Try again later",
    });
  }
};

export const activateAccount = async (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async function (err, decoded) {
        if (err) {
          console.log("JWT Verify error: ", err);
          return res.status(400).json({
            error: "Expired Link! Signup again",
          });
        }
        const { name, email, password } = jwt.decode(token);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          name: name,
          email: email,
          password: hashedPassword,
        });
        try {
          await user.save();
          return res.status(200).json({
            message: "Signup Success",
          });
        } catch (error) {
          console.log("Signup Error=> ", error);
        }
      }
    );
  } else {
    return res.status(400).json({
      message: "Didn't get token",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({
      error: "User does not exist, Go and Signup first",
    });
  }
  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return res.status(400).json({
      error: "Inavlid Credentials! Try again",
    });
  }
  const token = jwt.sign(
    {
      name: existingUser.name,
      _id: existingUser._id,
      email: email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
  // res.cookie("token", token, cookieOptions);
  res.cookie('token', token, cookieOptions);
  return res.status(200).cookie("token", token, cookieOptions).json({
    success: true,
    message: "Login Successful",
    token
  });
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    message: "User Details",
    user,
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    secure: true,
  });
  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({
      error: "User with given email does not exist, Sign it up",
    });
  }
  const token = jwt.sign(
    { _id: existingUser._id, name: existingUser.name },
    process.env.RESET_PASSWORD,
    { expiresIn: "10m" }
  );
  try {
    await existingUser.updateOne({ resetPasswordLink: token });
  } catch (error) {
    console.log(error);
  }
  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Password Reset Link",
    html: `
          <h1>Please use the following link to reset your password</h1>
          <h2>Link valid for 10 minutes only</h2>
          <hr />
          <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
          `,
  };
  sendEmailWithNodemailer(req, res, emailData);
};

export const resetPassword = async (req, res) => {
    const {resetPasswordLink, newPassword}=req.body;
    if(resetPasswordLink){
        jwt.verify(resetPasswordLink, process.env.RESET_PASSWORD, async function(err, decoded){
            if(err){
                return res.status(400).json({
                    error: 'Expired Link! Try again'
                })
            }
            const newPasswordHashed=await bcrypt.hash(newPassword, 10);
            const updatedFields={
                password: newPasswordHashed,
                resetPasswordLink: ''
            }
            const updatedUser=await User.findOneAndUpdate({resetPasswordLink}, {$set: updatedFields}, {new: true});
            if(!updatedUser){
                return res.status(400).json({
                    error: 'User not found'
                })
            }
            return res.status(200).json({
                success: true,
                message: 'Password Resetted successfully'
            })
        })
    }
};
