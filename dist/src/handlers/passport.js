"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_jwt_1 = require("passport-jwt");
var user_1 = __importDefault(require("../models/user"));
var cookieStractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['token'].split(' ')[1];
    }
    return token;
};
var opts = {
    jwtFromRequest: cookieStractor,
    secretOrKey: process.env.SECRET
};
exports.default = (function (passport) {
    passport.use(new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
        user_1.default.findOne({ email: jwt_payload.email })
            .then(function (user) {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        })
            .catch(function (err) { return console.log(err); });
    }));
});
