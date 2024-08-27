const _ = require('lodash');

export class BaseError extends Error {
    status: number;
    code: string;
    value: any;

    constructor(status: number, code: string, message?: string, value?: any) {
        super(message);
        this.status = status;
        this.code = code;
        this.value = value;
    }

    toObject() {
        return {
            code: this.code,
            message: this.message,
        };
    }

    toResponse() {
        return {
            status: this.status,
            error: this.toObject(),
            value: this.value,
        };
    }

    assignToArray(array: BaseError[], valueField: BaseError) {
        return array.map((item: BaseError) => {
            const resp = this.toResponse();

            if (valueField) {
                resp.value = _.get(item, valueField);
            }

            return Object.assign(item, resp);
        });
    }
}

/**
 * Generic "400 Bad Request" error
 */
export class BadRequestError extends BaseError {
    constructor(code?: string, message?: string) {
        super(400, code || 'badRequest', message);
    }
}

/**
 * Generic "401 Unauthorized" error
 */
export class UnauthorizedError extends BaseError {
    constructor(code?: string, message?: string) {
        super(401, code || 'unauthorized', message);
    }
}

/**
 * Generic "403 Forbidden" error
 */
export class ForbiddenError extends BaseError {
    constructor(code?: string, message?: string) {
        super(403, code || 'forbidden', message);
    }
}

/**
 * Generic "404 Not Found" error
 */
export class NotFoundError extends BaseError {
    constructor(code?: string, message?: string) {
        super(404, code || 'notFound', message);
    }
}

/**
 * Generic "409 Conflict" error
 */
export class ConflictError extends BaseError {
    constructor(code?: string, message?: string) {
        super(409, code || 'conflict', message);
    }
}


/**
 * Generic "500 Internal Server Error" error
 */
export class InternalServerError extends BaseError {
    constructor(code?: string, message?: string) {
        super(500, code || 'internalServerError', message);
    }
}