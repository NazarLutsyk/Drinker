let Client = require(global.paths.MODELS + '/Client');
let Rating = require(global.paths.MODELS + '/Rating');
module.exports = {
    async updateRating(req,res,next) {
        let user = req.user;
        let ratingId = req.params.id;
        if (user) {
            let allowed = await Rating.count({_id : ratingId, client : user._id});
            if (allowed > 0) {
                next();
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(403);
        }
    }
};