const _ = require('lodash');

class BaseError extends Error {
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
            error: {
                status: this.status,
                error: this.toObject(),
                value: this.value,
            },
        };
    }

    assignToArray(array: BaseError[], valueField: BaseError) {
        return array.map((item: BaseError) => {
            const resp = this.toResponse();

            if (valueField) {
                resp.error.value = _.get(item, valueField);
            }

            return Object.assign(item, resp);
        });
    }
}

/**
 * Generic "400 Bad Request" error
 */
class BadRequestError extends BaseError {
    constructor(code?: string, message?: string) {
        super(400, code || 'BadRequest', message);
    }
}

/**
 * Generic "401 Unauthorized" error
 */
class UnauthorizedError extends BaseError {
    constructor(code?: string, message?: string) {
        super(401, code || 'Unauthorized', message);
    }
}

/**
 * Generic "403 Forbidden" error
 */
class ForbiddenError extends BaseError {
    constructor(code?: string, message?: string) {
        super(403, code || 'Forbidden', message);
    }
}

/**
 * Generic "404 Not Found" error
 */
class NotFoundError extends BaseError {
    constructor(code?: string, message?: string) {
        super(404, code || 'NotFound', message);
    }
}

/**
 * Generic "409 Conflict" error
 */
class ConflictError extends BaseError {
    constructor(code?: string, message?: string) {
        super(409, code || 'Conflict', message);
    }
}


/**
 * Generic "500 Internal Server Error" error
 */
class InternalServerError extends BaseError {
    constructor(code?: string, message?: string) {
        super(500, code || 'InternalServerError', message);
    }
}