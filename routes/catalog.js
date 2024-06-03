var express = require('express');
var router = express.Router();
const DenominationController = require('../controllers/DenominationController')
const MajorFiguresController = require('../controllers/MajorFiguresController')
const UmbrellaDenomController = require('../controllers/UmbrellaDenomController')
router.get('/', function(req, res, next) {
  res.render('index', {
    title: "HI"
  });
});
router.get('/denomination', DenominationController.denomination_list)
router.get('/major-figures', MajorFiguresController.majorfigures_list)
module.exports = router;
