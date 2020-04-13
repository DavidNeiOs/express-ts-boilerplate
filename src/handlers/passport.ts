import  { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { PassportStatic } from 'passport'

import User from "../models/user"
import { Request } from 'express'

const cookieStractor = function(req: Request) {
  let token = null;
  if(req && req.cookies) {
    token = req.cookies['token'].split(' ')[1]
  }

  return token
}

const opts: StrategyOptions = {
  jwtFromRequest: cookieStractor,
  secretOrKey: process.env.SECRET
}

export default (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne({ email: jwt_payload.email })
      .then(user => {
        if(user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(err => console.log(err))
    })
  )
}
