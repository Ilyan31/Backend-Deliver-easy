"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const login = async (req, res) => {
    const { email, password } = req.body;
    const [user] = await db_1.default.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    const validPassword = await bcryptjs_1.default.compare(password, user.password);
    if (!validPassword)
        return res.status(400).json({ message: 'Invalid password' });
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
exports.login = login;
