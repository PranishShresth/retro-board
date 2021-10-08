export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  NOT_AUTHORIZED = 401,
  INTERNAL_SERVER = 500,
}

class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;

  constructor(name: string, httpCode: HttpStatusCode, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    Error.captureStackTrace(this);
  }
}

export class APIError extends BaseError {
  constructor(
    name,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    description = "Internal server error"
  ) {
    super(name, httpCode, description);
  }
}
