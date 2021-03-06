let Bonuse = require("../models/Bonuse");
let path = require("path");
let keysValidator = require("../validators/keysValidator");
let mongoose = require("mongoose");
let upload = require("../middleware/multer")(path.join(__dirname, "../public", "upload", "promo"));
upload = upload.single("image");
module.exports = {
    async getBonuses(req, res, next) {
        try {
            if (JSON.stringify(req.query).search(/^[0-9a-fA-F]{24}$/)) {
                function iterate(obj, stack) {
                    for (let property in obj) {
                        if (obj.hasOwnProperty(property)) {
                            if (typeof obj[property] === "object") {
                                iterate(obj[property], stack + "." + property);
                            } else if (typeof obj[property] === "string" && obj[property].match(/^[0-9a-fA-F]{24}$/)) {
                                obj[property] = mongoose.Types.ObjectId(obj[property]);
                            }
                        }
                    }
                }

                iterate(req.query, "");
            }
            res.json(await Bonuse.superfind(req.query));
        } catch (e) {
            e.status = 400;
            return next(e);
        }
    },
    async getBonuseById(req, res, next) {
        let bonuseId = req.params.id;
        try {
            req.query.query._id = bonuseId;
            let bonuse = await Bonuse.superfind(req.query);
            res.json(bonuse[0]);
        } catch (e) {
            e.status = 400;
            return next(e);
        }
    },
    async createBonuse(req, res, next) {
        try {
            let err = keysValidator.diff(Bonuse.schema.tree, req.body);
            if (err) {
                throw new Error("Unknown fields " + err);
            } else {
                let bonuse = new Bonuse(req.body);
                if (bonuse) {
                    upload(req, res, async function (err) {
                        if (err) {
                            err.status = 400;
                            return next(err);
                        } else {
                            bonuse.image = req.file ? "/upload/promo/" + req.file.filename : "";
                            try {
                                bonuse.author = req.user._id;
                                bonuse = await bonuse.supersave();
                                res.status(201).json(bonuse);
                            } catch (e) {
                                e.status = 400;
                                return next(e);
                            }
                        }
                    });
                }
            }
        } catch (e) {
            e.status = 400;
            return next(e);
        }
    },
    async updateBonuse(req, res, next) {
        let bonuseId = req.params.id;
        try {
            let err = keysValidator.diff(Bonuse.schema.tree, req.body);
            if (err) {
                throw new Error("Unknown fields " + err);
            } else {
                let bonuse = await Bonuse.findById(bonuseId);
                if (bonuse) {
                    upload(req, res, async function (err) {
                        if (err) {
                            err.status = 400;
                            return next(err);
                        } else {
                            if (err) {
                                return res.status(400).send(err.toString());
                            } else if (req.file) {
                                req.body.image = "/upload/promo/" + req.file.filename;
                            }
                            try {
                                let updated = await bonuse.superupdate(req.body);
                                res.status(201).json(updated);
                            } catch (e) {
                                e.status = 400;
                                return next(e);
                            }
                        }
                    });
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
    async removeBonuse(req, res, next) {
        let bonuseId = req.params.id;
        try {
            let bonuse = await Bonuse.findById(bonuseId);
            if (bonuse) {
                bonuse = await bonuse.remove();
                res.status(204).json(bonuse);
            } else {
                let e = new Error();
                e.status = 404;
                e.message = "Not found";
                return next(e);
            }
        } catch (e) {
            e.status = 400;
            return next(e);
        }
    },
};