"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
// Had to ignore because of env var can be undefined
//@ts-ignore
mongoose_1.default.connect(process.env.MONGO_DB_URL, options);
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connection.on('error', function (err) {
    console.log("db error: " + err.message);
});
// MODELS
// we need to configure mongoose models before importing the server
// so we can use them in the routes
var app_1 = __importDefault(require("./app"));
var server = app_1.default.listen(4000, function () { return console.log("Express listenning in port 4000 \uD83D\uDC4D"); });
