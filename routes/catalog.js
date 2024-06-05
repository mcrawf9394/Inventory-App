var express = require('express');
var router = express.Router();
const DenominationController = require('../controllers/DenominationController')
const MajorFiguresController = require('../controllers/MajorFiguresController')
const UmbrellaDenomController = require('../controllers/UmbrellaDenomController')
router.get('/', function(req, res, next) {
  res.render('index', {
    title: "Basic Christianity Wiki"
  });
});
router.get('/denomination', DenominationController.denomination_list)
router.get('/major-figures', MajorFiguresController.majorfigures_list)
router.get('/branch', UmbrellaDenomController.umbrelladenom_list)

router.get('/denomination/add', DenominationController.denomination_add_get)
router.post('/denomination/add', DenominationController.denomination_add_post)

router.get('/denomination/:id', DenominationController.denomination_detail)
router.get('/major-figures/:id', MajorFiguresController.majorfigures_detail)
router.get('/branch/:id', UmbrellaDenomController.umbrelladenom_detail)


module.exports = router;
