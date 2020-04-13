"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var authController_1 = require("../controllers/authController");
var router = express_1.default.Router();
exports.router = router;
router.get('/', passport_1.default.authenticate('jwt', { session: false }), function (req, res) {
    res.json({ success: true });
});
router.get('/me', authController_1.getCurrentUser);
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
router.get('/logout', authController_1.logout);
