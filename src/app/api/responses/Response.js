class Response {
    constructor(statusCode, status, message, data = [], pageSize = null, pageNumber = null, pageTotal = null) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
        this.data = data;
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
        this.pageTotal = pageTotal;
    }

    static success(message, data = [], pageSize = null, pageNumber = null) {
        return new Response(200, 'success', message, data, pageSize, pageNumber);
    }

    static error(message, statusCode = 500) {
        return new Response(statusCode, 'error', message);
    }
}

module.exports = Response;
