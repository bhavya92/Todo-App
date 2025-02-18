require("dotenv").config();

const { Router } = require("express");
const { userModel } = require("../db");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const { authMiddleware } = require("../middleware/authMiddleware");
const { generateOtp } = require("../utils/otp_generator");
const { generate_mail } = require("../services/mailer");
const { setData, getData } = require("../services/redis");




async function generateHash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(
      password,
      parseInt(process.env.SALTROUND),
      function (err, hash) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log("Hash generation successful");
          resolve(hash);
        }
      },
    );
  });
}

const signUpSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8).trim(),
  firstName: z.string().min(2).max(20).trim(),
  lastName: z.string().min(2).max(20).trim(),
});

const logInSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8).trim(),
});

const userRouter = Router();

userRouter.post("/verify-email", async function(req, res) {
  console.log("Inside /verify-email");
  try {
    const user = await userModel.find({ email: req.body.email });
    if(user.length !== 0) {
      return res.status(409).json({
        status: "409",
        error: "Conflict",
        message: "Email already exists",
      });
    }

    let newOtp = generateOtp();
    let result = await generate_mail(req.body.email, newOtp);
    if(result === '1') {
      //mail send success
      //storing mail and otp in redis
      console.log("Inside result === 1");
      const result = setData(req.body.email, newOtp)
      if(result === '0') {
        return res.status(500).json({
          status:"500",
          error:"Error",
          message:"Something went wrong",
        })
      }
      return res.status(200).json({
        status:"200",
        error:"none",
        message:"mail sent",
      })
    } else {
      console.log(`Inside result===${result}`);
      return res.status(500).json({
        status:"500",
        error:"Error sending mail",
        message:"Something went wrong",
      })
    }
  } catch(err) {
    console.log(err);
  }
})

userRouter.post("/verify-otp", async function(req, res) {
  console.log("/verify-otp hitted");
  const userOtp = req.body.otp;
  const email = req.body.email;
  console.log(`userOtp : ${userOtp}`);
  console.log(`email : ${email}`);
  const generatedOtp = await getData(email);
  console.log(`generatedOtp : ${generatedOtp}`);
  if(generateOtp === '0') {
    return res.status(500).json({
      status:"500",
      error:"Error",
      message:"Something went wrong",
    })
  }
  if(userOtp === generatedOtp) {
    return res.status(200).json({
      status:"200",
      error:"None",
      message:"otp verified succesfully",
    })
  } else {
    return res.status(400).json({
      status:"400",
      error:"Error verifying otp",
      message:"Wrong otp",
    })
  }
})

userRouter.post("/signup", async function (req, res) {
  console.log("signup end point hitted");
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  let generatedHash = "";
  //let result = signUpSchema.safeParse(userData);
  console.log("req : " + req.body.email);

  // if (!result.success) {
  //   return res.status(500).json({
  //     status: "500",
  //     error: "Internal Server Error",
  //     message: "Something went wrong. Please try again later.",
  //   });
  // }

  //Checking if user already exists
  try {
    // const user = await userModel.find({ email: result.data.email });
    // if (user.length !== 0) {
    //   return res.status(409).json({
    //     status: "409",
    //     error: "Conflict",
    //     message: "Email already exists",
    //   });
    // }
    //TODO : Do otp verification, if succecdes then create user else send status 
    /* New routes -> Enter email -> Send to /verify-email -> enter otp -> to /verify-otp -> Enter pass -> to /signup  
      Generate otp -> pass that otp to mail function -> generate mail 
      SIMUL :: at FE ask for otp input -> comapre that otp with the one created -> if match then succeed else reject (show error)
     */
   
 
    generatedHash = await generateHash(password);

    const newUser = await userModel.create({
      email: email,
      password: generatedHash,
      firstName: firstName,
      lastName: lastName,
    });
    //generate token and send
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
    );
    console.log("Token generated " + typeof token);
    //TODO : Create personal topic of new user created
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: new Date(Date.now() + 7 * 24 * 3600000),
      })
      .json({
        status: "200",
        error: "none",
        message: "Signup Success",
        email: newUser.email,
        firstName : newUser.firstName,
        lastName : newUser.lastName,
      });
  } catch (err) {
    console.log(err);
  }
});
// userRouter.get('/signup/google',passport.authenticate('google'));
userRouter.get("/validate-token", authMiddleware, function (req, res) {
  res.status(200).json({
    status: "200",
    error: "none",
    message: "Token Validated",
  });
});

userRouter.post("/login", async function (req, res) {
  console.log("login hitted");
  const userData = req.body;
  let result = logInSchema.safeParse(userData);

  if (!result.success) {
    return res.status(400).json({
      status: "400",
      message: "None",
      error: "Bad Request",
    });
  }

  const user = await userModel.findOne({
    email: result.data.email,
  });
  if (user) {
    bcrypt.compare(result.data.password, user.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET,
        );
        console.log("Token generated " + token);
        console.log(`email : ${user.email} firstName : ${user.firstName} lastName:${user.lastName}`);
        res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(Date.now() + 7 * 24 * 3600000),
          })
          .json({
            status: "200",
            message: "Login Success",
            error: "None",
            email: user.email,
            firstName : user.firstName,
            lastName : user.lastName,
          });
      } else {
        res.status(401).json({
          status: "401",
          error: "Unauthorized",
          message: "Incorrect credentials",
        });
      }
    });
  } else {
    res.status(403).json({
      status: "403",
      error: "Forbidden",
      message: "Incorrect credentials",
    });
  }
});

userRouter.post("/logout", authMiddleware, function (req, res) {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      expires: new Date(0),
    })
    .json({
      status: "200",
      error: "none",
      message: "User logeged out",
    });
});

module.exports = {
  userRouter,
};
