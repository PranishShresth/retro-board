import { check } from "express-validator";
import { validationResult } from "express-validator";
import { Response, Request, NextFunction } from "express";

const handleError = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateCreateBoard = [
  check("board_title").notEmpty().isLength({ min: 1 }),
  handleError,
];

export const validateCreateList = [
  check("list_title").notEmpty().isLength({ min: 1 }),
  handleError,
];

export const validateCreateItem = [
  check("item_title").notEmpty().isLength({ min: 1 }),
  handleError,
];
