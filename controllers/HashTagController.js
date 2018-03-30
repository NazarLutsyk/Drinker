let HashTag = require('../models/HashTag');
let keysValidator = require('../validators/keysValidator');
let objectHelper = require('../helpers/objectHelper');

module.exports = {
    async getHashTags(req, res,next) {
        try {
            let hashTagQuery;
            if (req.query.aggregate) {
                hashTagQuery = HashTag.aggregate(req.query.aggregate);
            } else {
                hashTagQuery = HashTag
                    .find(req.query.query)
                    .sort(req.query.sort)
                    .select(req.query.fields)
                    .skip(req.query.skip)
                    .limit(req.query.limit);
                if (req.query.populate) {
                    for (let populateField of req.query.populate) {
                        hashTagQuery.populate(populateField);
                    }
                }
            }
            let hashTags = await hashTagQuery.exec();
            res.json(hashTags);
        } catch (e) {
            e.status = 400;
            return next(e);
        }
    },
    async getHashTagById(req, res,next) {
        let hashTagId = req.params.id;
        try {
            let hashTagQuery = HashTag.findOne({_id: hashTagId})
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    hashTagQuery.populate(populateField);
                }
            }
            let hashTag = await hashTagQuery.exec();
            res.json(hashTag);
        } catch (e) {
            e.status = 400;
            return next(e);
        }
    },
    async createHashTag(req, res,next) {
        try {
            let err = keysValidator.diff(HashTag.schema.tree, req.body);
            if (err) {
                throw new Error('Unknown fields ' + err);
            } else {
                let hashTag = await HashTag.create(req.body);
                res.status(201).json(hashTag);
            }
        } catch (e) {
            e.status = 400;
            return next(e);
        }
    },
    async updateHashTag(req, res,next) {
        let hashTagId = req.params.id;
        try {
            let err = keysValidator.diff(HashTag.schema.tree, req.body);
            if (err) {
                throw new Error('Unknown fields ' + err);
            } else {
                let hashTag = await HashTag.findById(hashTagId);
                if (hashTag) {
                    objectHelper.load(lang, req.body);
                    let updated = await hashTag.save();
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
    async removeHashTag(req, res,next) {
        let hashTagId = req.params.id;
        try {
            let hashTag = await HashTag.findById(hashTagId);
            if (hashTag) {
                hashTag = await hashTag.remove();
                res.status(204).json(hashTag);
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