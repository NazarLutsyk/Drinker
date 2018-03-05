let HashTag = require('../models/HashTag');
let relationHelper = require('../helpers/relationHelper');

module.exports = {
    async getHashTags(req, res) {
        try {
            let hashTagQuery = HashTag
                .find(req.query.query)
                .sort(req.query.sort)
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    hashTagQuery.populate(populateField);
                }
            }
            let hashTags = await hashTagQuery.exec();
            res.json(hashTags);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async getHashTagById(req, res) {
        let hashTagId = req.params.id;
        try {
            let hashTagQuery = HashTag.find({_id: hashTagId})
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    hashTagQuery.populate(populateField);
                }
            }
            let hashTag = await hashTagQuery.exec();
            res.json(hashTag);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async createHashTag(req, res) {
        try {
            let hashTag = await HashTag.create(req.body);
            res.status(201).json(hashTag);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async updateHashTag(req, res) {
        let hashTagId = req.params.id;
        try {
            let hashTag = await HashTag.findByIdAndUpdate(hashTagId, req.body,{new : true});
            res.status(201).json(hashTag);
        } catch (e) {
            res.status(404).send(e.toString());
        }
    },
    async removeHashTag(req, res) {
        let hashTagId = req.params.id;
        try {
            let hashTag = await HashTag.findById(hashTagId);
            hashTag = await hashTag.remove();
            res.status(204).json(hashTag);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async addPlace(req, res) {
        let modelId = req.params.id;
        let placeId = req.params.idPlace;
        try {
            if (modelId && placeId) {
                await relationHelper.addRelation
                ('HashTag', 'Place', modelId, placeId, 'places', 'hashTags');
                res.sendStatus(201);
            } else {
                throw new Error('Id in path eq null');
            }
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async removePlace(req, res) {
        let modelId = req.params.id;
        let placeId = req.params.idPlace;
        try {
            if (modelId && placeId) {
                await relationHelper.removeRelation
                ('HashTag', 'Place', modelId, placeId, 'places', 'hashTags');
                res.sendStatus(204);
            } else {
                throw new Error('Id in path eq null');
            }
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};