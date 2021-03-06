let Client = require("../models/Client");
let keysValidator = require("../validators/keysValidator");

module.exports = {
    async getClients(req, res, next) {
        try {
            res.json(await Client.superfind(req.query));
        } catch (e) {
            e.status = 400;
            return next(e);
        }
    },
    async getClientById(req, res, next) {
        let clientId = req.params.id;
        try {
            req.query.query._id = clientId;
            let client = await Client.superfind(req.query);
            res.json(client[0]);
        } catch (e) {
            e.status = 400;
            return next(e);
        }
    },
    async updateClient(req, res, next) {
        let clientId = req.params.id;
        try {
            let err = keysValidator.diff(Client.schema.tree, req.body);
            if (err) {
                throw new Error("Unknown fields " + err);
            } else {
                let client = await Client.findById(clientId);
                if (client) {
                    let updated = await client.superupdate(req.body);
                    res.status(201).json(updated);
                } else {
                    let e = new Error();
                    e.message = "Not found";
                    e.status = 404;
                    return next(e);
                }
            }
        } catch (e) {
            e.status = 400;
            return next(e);
        }
    },
    async removeClient(req, res, next) {
        let clientId = req.params.id;
        try {
            let removedClient = await Client.findById(clientId);
            if (removedClient) {
                removedClient = await removedClient.remove();
                res.status(204).json(removedClient);
            } else {
                let e = new Error();
                e.message = "Not found";
                e.status = 404;
                return next(e);
            }
        } catch (e) {
            e.status = 400;
            return next(e);
        }
    },
};