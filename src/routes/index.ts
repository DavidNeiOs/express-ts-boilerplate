import express from "express"
import passport from "passport"

import { register, login, getCurrentUser, logout } from "../controllers/authController"

const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }) ,(req, res) => {
  res.json({ success: true })
})

router.get('/me', getCurrentUser)

router.post('/register', register)

router.post('/login', login)

router.get('/logout', logout)

export { router }