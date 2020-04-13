"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var cors_1 = __importDefault(require("cors"));
var mongoose_1 = __importDefault(require("mongoose"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var passport_1 = __importDefault(require("passport"));
var passport_2 = __importDefault(require("./src/handlers/passport"));
var routes_1 = require("./src/routes");
var app = express_1.default();
dotenv_1.default.config();
var MongoStore = connect_mongo_1.default(express_session_1.default);
// configure this to only accept requests from client
app.use(cors_1.default({
    origin: true,
    credentials: true
}));
app.use(express_1.default.static(__dirname + "/public"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
app.use(express_session_1.default({
    secret: "dtd-session",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose_1.default.connection })
}));
app.use(passport_1.default.initialize());
passport_2.default(passport_1.default);
// ROUTES
app.use('/', routes_1.router);
exports.default = app;
