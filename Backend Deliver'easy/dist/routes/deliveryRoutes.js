"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deliveryController_1 = require("../controllers/deliveryController");
const router = (0, express_1.Router)();
router.get('/', deliveryController_1.getAllDeliveries);
router.post('/', deliveryController_1.createDelivery);
exports.default = router;
