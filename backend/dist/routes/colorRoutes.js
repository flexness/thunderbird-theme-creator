"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/change', (req, res) => {
    const { color } = req.body;
    console.log(`Color changed to: ${color}`);
    res.send({ success: true, color });
});
exports.default = router;
