"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../utils/errorHandler");
function BadRequestMiddleware(err, req, res, next) {
    res
        .status(errorHandler_1.HttpStatusCode.INTERNAL_SERVER)
        .json(new errorHandler_1.APIError(errorHandler_1.HttpStatusCode.INTERNAL_SERVER));
}
//# sourceMappingURL=errorMiddleware.js.map