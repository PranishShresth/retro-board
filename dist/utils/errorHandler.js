"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = exports.HttpStatusCode = void 0;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCode[HttpStatusCode["NOT_AUTHORIZED"] = 401] = "NOT_AUTHORIZED";
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER"] = 500] = "INTERNAL_SERVER";
})(HttpStatusCode = exports.HttpStatusCode || (exports.HttpStatusCode = {}));
class BaseError extends Error {
    constructor(name, httpCode, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.httpCode = httpCode;
        Error.captureStackTrace(this);
    }
}
class APIError extends BaseError {
    constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, description = "Internal server error") {
        super(name, httpCode, description);
    }
}
exports.APIError = APIError;
//# sourceMappingURL=errorHandler.js.map