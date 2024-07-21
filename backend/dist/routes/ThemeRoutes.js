"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.post('/save', (req, res) => {
    const themeData = req.body;
    const themePath = path_1.default.join(__dirname, '../../../theme-blueprint.json');
    fs_1.default.writeFile(themePath, JSON.stringify(themeData, null, 2), (err) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to save theme' });
        }
        res.send({ success: true });
    });
});
exports.default = router;
