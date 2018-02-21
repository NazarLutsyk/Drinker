const PlaceRouter = require('./place');
const ClientRouter = require('./client');
const LangRouter = require('./lang');
const PlaceTypeRouter = require('./placeType');
const TopPlaceRouter = require('./topPlace');
const HashTagRouter = require('./hashTag');
const DepartmentRouter = require('./department');
const RatingRouter = require('./rating');
const DrinkApplicationRouter = require('./drinkApplication');
const CurrencyRouter = require('./currency');
const ComplaintRouter = require('./complaint');
const DayRouter = require('./day');
const NewsRouter = require('./news');
const BonuseRouter = require('./bonuse');
const EventRouter = require('./event');
const PlaceMultilangRouter = require('./placeMultilang');
const PlaceTypeMultilangRouter = require('./placeTypeMultilang');
const NewsMultilangRouter = require('./newsMultilang');
const BonuseMultilangRouter = require('./bonuseMultilang');
const EventMultilangRouter = require('./eventMultilang');

const express = require('express');
const router = express.Router();

router.use('/place', PlaceRouter);
router.use('/client', ClientRouter);
router.use('/lang', LangRouter);
router.use('/placeType', PlaceTypeRouter);
router.use('/topPlace', TopPlaceRouter);
router.use('/hashTag', HashTagRouter);
router.use('/department', DepartmentRouter);
router.use('/rating', RatingRouter);
router.use('/drinkApplication', DrinkApplicationRouter);
router.use('/currency', CurrencyRouter);
router.use('/complaint', ComplaintRouter);
router.use('/day', DayRouter);
router.use('/news', NewsRouter);
router.use('/bonuse', BonuseRouter);
router.use('/event', EventRouter);
router.use('/placeMultilang', PlaceMultilangRouter);
router.use('/placeTypeMultilang', PlaceTypeMultilangRouter);
router.use('/newsMultilang', NewsMultilangRouter);
router.use('/bonuseMultilang', BonuseMultilangRouter);
router.use('/eventMultilang', EventMultilangRouter);

module.exports = router;