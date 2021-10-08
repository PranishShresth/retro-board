import { NextFunction, Request, Response } from "express";
import { APIError, HttpStatusCode } from "../utils/errorHandler";

function BadRequestMiddleware(
  err: HttpStatusCode,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res
    .status(HttpStatusCode.INTERNAL_SERVER)
    .json(new APIError(HttpStatusCode.INTERNAL_SERVER));
}
