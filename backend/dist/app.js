"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ColorRoutes_1 = __importDefault(require("./routes/ColorRoutes"));
const BlueprintRoutes_1 = __importDefault(require("./routes/BlueprintRoutes"));
const ThemeRoutes_1 = __importDefault(require("./routes/ThemeRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/colors', ColorRoutes_1.default);
app.use('/api/blueprint', BlueprintRoutes_1.default);
app.use('/api/theme', ThemeRoutes_1.default);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
