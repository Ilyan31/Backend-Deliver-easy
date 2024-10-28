"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDelivery = exports.getAllDeliveries = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllDeliveries = async (req, res) => {
    const [deliveries] = await db_1.default.query('SELECT * FROM deliveries');
    res.json(deliveries);
};
exports.getAllDeliveries = getAllDeliveries;
const createDelivery = async (req, res) => {
    const { address, deliveryDate } = req.body;
    const [result] = await db_1.default.query('INSERT INTO deliveries (address, delivery_date) VALUES (?, ?)', [address, deliveryDate]);
    res.json({ id: result.insertId, address, deliveryDate });
};
exports.createDelivery = createDelivery;
