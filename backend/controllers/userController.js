import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

// handles google login
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = (req, res) => {
  const { idToken } = req.body;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    .then((response) => {
      const { email_verified, name, email } = response.payload;

      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: "3d"
            });
            const { _id, email, name } = user;
            return res.json({
              token,
              user: { _id, email, name }
            });
          } else {
            const password = email + process.env.JWT_SECRET;

            user = new User({ name, email, password });
            user
              .save((err, data) => {
                if (err) {
                  return res.status(400).json({
                    error: "User signup failed with google"
                  });
                }
                const token = jwt.sign(
                  { _id: data._id },
                  process.env.JWT_SECRET,
                  { expiresIn: "3d" }
                );
                const { _id, email, name } = data;

                return res.json({
                  token,
                  user: { _id, email, name }
                });
              })
              .catch((err) => {
                return res.status(401).json({
                  message: "signup error"
                });
              });
          }
        });
      } else {
        return res.status(400).json({
          error: "Google login failed. Try again"
        });
      }
    });
};

export const Login=async(req,res)=>{
     const {email,name,password} = req.body;
     const curUser = await User.find({email});
     if(!curUser){
        return res.status(400).json({
          error: "user is not found.."
        });
     }
     const token = jwt.sign(
      { _id: curUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    return res.status(200).json({
      token,
      user: { 
        _id:curUser._id, 
        email, 
        name }
    });
}

export const Register=async(req,res)=>{
  const {email,name,password} = req.body;
  const existUser = await User.find({email});
  if(existUser){
     return res.status(400).json({
       error: "Email is already in use.."
     });
  }
  const newUser= await User.create({
    name,
    email,
    password
  })
  const token = jwt.sign(
    { _id: newUser._id },
    process.env.JWT_SECRET,
    { expiresIn: "3d" }
  );
  return res.status(200).json({
    token,
    user: { _id:newUser._id, email, name }
  });
}