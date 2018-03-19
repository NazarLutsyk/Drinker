let News = require(global.paths.MODELS + '/News');
let path = require('path');
let keysValidator = require(global.paths.VALIDATORS + '/keysValidator');

module.exports = {
    async getNews(req, res) {
        try {
            let newsQuery = News
                .find(req.query.query)
                .sort(req.query.sort)
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    newsQuery.populate(populateField);
                }
            }
            let news = await newsQuery.exec();
            res.json(news);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async getNewsById(req, res) {
        let newsId = req.params.id;
        try {
            let newsQuery = News.findOne({_id: newsId})
                .select(req.query.fields);
            if (req.query.populate) {
                for (let populateField of req.query.populate) {
                    newsQuery.populate(populateField);
                }
            }
            let news = await newsQuery.exec();
            res.json(news);
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async createNews(req, res) {
        try {
            let err = keysValidator.diff(News.schema.tree, req.body);
            if (err){
                throw new Error('Unknown fields ' + err);
            } else {
                let news = new News(req.body);
                news = await news.supersave(News);
                res.status(201).json(news);
            }
        } catch (e) {
            console.log(e);
            res.status(400).send(e.toString());
        }
    },
    async updateNews(req, res) {
        let newsId = req.params.id;
        try {
            let err = keysValidator.diff(News.schema.tree, req.body);
            if (err){
                throw new Error('Unknown fields ' + err);
            } else {
                let news = await News.findById(newsId);
                if (news) {
                    let updated = await news.superupdate(News,req.body);
                    res.status(201).json(updated);
                }else {
                    res.sendStatus(404);
                }
            }
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async removeNews(req, res) {
        let newsId = req.params.id;
        try {
            let news = await News.findById(newsId);
            if (news) {
                news = await news.remove();
                res.status(204).json(news);
            } else {
                res.sendStatus(404);
            }
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async addMultilang(req, res) {
        let modelId = req.params.id;
        let multilangId = req.params.idMultilang;
        try {
            if (modelId && multilangId) {
                let news = await News.findById(modelId);
                await news.superupdate(News,{
                    multilang: news.multilang.concat(multilangId)
                });
                res.sendStatus(201);
            } else {
                throw new Error('Id in path eq null');
            }
        } catch (e) {
            res.status(400).send(e.toString());
        }
    },
    async removeMultilang(req, res) {
        let modelId = req.params.id;
        let multilangId = req.params.idMultilang;
        try {
            if (modelId && multilangId) {
                let news = await News.findById(modelId);
                news.multilang.splice(news.multilang.indexOf(multilangId),1);
                await news.superupdate(News,{
                    multilang: news.multilang
                });
                res.sendStatus(204);
            } else {
                throw new Error('Id in path eq null');
            }
        } catch (e) {
            res.status(400).send(e.toString());
        }
    }
};