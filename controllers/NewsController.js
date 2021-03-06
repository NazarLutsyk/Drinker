let News = require("../models/News");
let path = require("path");
let mongoose = require("mongoose");
let keysValidator = require("../validators/keysValidator");
let upload = require("../middleware/multer")(path.join(__dirname, "../public", "upload", "promo"));
upload = upload.single("image");
module.exports = {
    async getNews(req, res, next) {
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
            res.json(await News.superfind(req.query));
        } catch (e) {
            e.status = 400;
            return next(e);
        }
    },
    async getNewsById(req, res, next) {
        let newsId = req.params.id;
        try {
            req.query.query._id = newsId;
            let news = await News.superfind(req.query);
            res.json(news[0]);
        } catch (e) {
            e.status = 400;
            return next(e);
        }
    },
    async createNews(req, res, next) {
        try {
            let err = keysValidator.diff(News.schema.tree, req.body);
            if (err) {
                throw new Error("Unknown fields " + err);
            } else {
                let news = new News(req.body);
                if (news) {
                    upload(req, res, async function (err) {
                        if (err) {
                            return res.status(400).send(err.toString());
                        } else {
                            news.image = req.file ? "/upload/promo/" + req.file.filename : "";
                            try {
                                news.author = req.user._id;
                                news = await news.supersave();
                                res.status(201).json(news);
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
    async updateNews(req, res, next) {
        let newsId = req.params.id;
        try {
            let err = keysValidator.diff(News.schema.tree, req.body);
            if (err) {
                throw new Error("Unknown fields " + err);
            } else {
                let news = await News.findById(newsId);
                if (news) {
                    upload(req, res, async function (err) {
                        if (err) {
                            return res.status(400).send(err.toString());
                        } else {
                            if (err) {
                                return res.status(400).send(err.toString());
                            } else if (req.file) {
                                req.body.image = "/upload/promo/" + req.file.filename;
                            }
                            try {
                                let updated = await news.superupdate(req.body);
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
    async removeNews(req, res, next) {
        let newsId = req.params.id;
        try {
            let news = await News.findById(newsId);
            if (news) {
                news = await news.remove();
                res.status(204).json(news);
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