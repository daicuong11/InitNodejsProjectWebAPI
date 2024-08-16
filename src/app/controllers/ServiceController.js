const Response = require("../api/responses/Response");

class ServiceController {
    //[GET] /
    index(req, res) {
        res.json(Response.success('Get all service successfully', []));
    }

}

module.exports = new ServiceController();
