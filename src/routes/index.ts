import express from "express"
import { verify } from "jsonwebtoken"
import { register, login } from "../controllers/authController"
import User from "../models/user"
import passport from "passport"

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }) ,(req, res) => {
  console.log('cookies', req.cookies)
  res.json({ success: true })
})

router.get('/me', async (req, res) => {
  console.log('cookies', req.cookies)
  if(!req.cookies.token) return res.status(200).json({ success: false, message: "You are not logged in" })

  const secret = process.env.SECRET || 'mySecret'
  const token = req.cookies.token.split(' ')[1]
  const userData = <any>verify(token, secret)

  
  const user = await User.findOne({ email: userData.email })
  if(!user) return res.status(500).json({ success: false, message: "Cannot find user right now"})

  return res.status(200).json({ success: true, user: { email: user.email, name: user.name }})
})

router.post('/register', register)

router.post('/login', login)

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.status(200).json({ success: true, message: 'Logged out successfully'})
})

export { router }