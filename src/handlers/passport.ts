import  { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { PassportStatic } from 'passport'

import User from "../models/user"

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}

export default (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
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
