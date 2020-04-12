import express, { Application } from 'express'
import session from "express-session"
import connectMongo from "connect-mongo"
import cors from 'cors'
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import dotenv from "dotenv"

import passport from 'passport'

import passportConfig from "./src/handlers/passport"
import { router } from "./src/routes"

const app: Application  = express();

dotenv.config();


const MongoStore = connectMongo(session)

// configure this to only accept requests from client
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.json())
app.use(session({
  secret: "dtd-session",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(passport.initialize());
passportConfig(passport)

// ROUTES
app.use('/', router)


export default app

