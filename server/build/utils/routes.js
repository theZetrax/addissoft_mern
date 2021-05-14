"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/users', function (req, res, next) {
    res.json({
        message: "welcome"
    });
});
exports.default = router;
