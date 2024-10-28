"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3360; // Port mis à jour
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Route de base avec un message de débogage
app.get('/', (req, res) => {
    console.log("Route / appelée"); // Message de débogage pour confirmer l'accès
    res.send("Bienvenue sur l'API Deliver'easy !");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
