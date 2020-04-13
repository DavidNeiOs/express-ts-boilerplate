import { RequestHandler } from "express"
import * as bcrypt from 'bcryptjs'
import * as jwt from "jsonwebtoken"

import User from "../models/user"

export const isLoggedIn: RequestHandler = (req, res, next) => {
  if(req.headers.authorization) {
    next()
    return
  } else {
    res.status(401).send({ success: false, message: 'You must be logged in' })
  }
}


export const register: RequestHandler = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if(user) {
    return res.status(400).json({ success: false, message: "Email already exists"})
  }

  const { name, email, password } = req.body;

  const newUser = new User({
    name, email, password
  })

  // hash of password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(newUser.password, salt)
  newUser.password = hash;
  const userDb = await newUser.save()

  // sign in directly

  const payload = {
    id: userDb.id,
    name: userDb.name
  }

  const secret = process.env.SECRET || 'mySecret'

  jwt.sign(
    payload,
    secret,
    {
      expiresIn: 31556926
    },
    (err, token) => {
      res.json({
        success: true,
        token: `Bearer ${token}`
      })
    }
  )
}

export const login: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const cookies = req.cookies.token;
  console.log('cookies', cookies)
  // Find user by email
  const user = await User.findOne({ email })
  // Check if user exists
  if (!user) {
    return res.status(404).json({ succes: false, message: "Email not found" });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password)
  if (isMatch) {
    // User matched
    // Create JWT Payload
    const payload = {
      email: user.email,
      name: user.name,
    };
    const secret = process.env.SECRET || 'mySecret'
    // Sign token
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: 31556926 // 1 year in seconds
      },
      (err, token) => {
        // set cookie
        res.cookie('token', `Bearer ${token}`, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        res.json({
          success: true,
          token: "Bearer " + token
        });
      }
    );
  } else {
    return res.status(406).json({ success: false, message: "Passwords dont match" });
  }
}