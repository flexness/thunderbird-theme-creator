"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const blueprintPath = path_1.default.join(__dirname, '../../../theme-blueprint.json');
    fs_1.default.readFile(blueprintPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to load blueprint' });
        }
        res.send(JSON.parse(data));
    });
});
exports.default = router;
