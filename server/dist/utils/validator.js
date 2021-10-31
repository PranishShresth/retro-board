"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateItem = exports.validateCreateList = exports.validateCreateBoard = void 0;
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
const handleError = (req, res, next) => {
    const errors = express_validator_2.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validateCreateBoard = [
    express_validator_1.check("board_title").notEmpty().isLength({ min: 1 }),
    handleError,
];
exports.validateCreateList = [
    express_validator_1.check("list_title").notEmpty().isLength({ min: 1 }),
    handleError,
];
exports.validateCreateItem = [
    express_validator_1.check("item_title").notEmpty().isLength({ min: 1 }),
    handleError,
];
//# sourceMappingURL=validator.js.map