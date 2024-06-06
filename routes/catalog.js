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
router.get('/major-figures/add', MajorFiguresController.majorfigures_add_get)
router.post('/major-figures/add', MajorFiguresController.majorfigures_add_post)
router.get('/branch/add', UmbrellaDenomController.umbrelladenom_add_get)
router.post('/branch/add', UmbrellaDenomController.umbrelladenom_add_post)

router.get('/denomination/:id', DenominationController.denomination_detail)
router.get('/major-figures/:id', MajorFiguresController.majorfigures_detail)
router.get('/branch/:id', UmbrellaDenomController.umbrelladenom_detail)

router.get('/denomination/:id/delete', DenominationController.denomination_delete_get)
router.post('/denomination/:id/delete', DenominationController.denomination_delete_post)
router.get('/major-figures/:id/delete', MajorFiguresController.majorfigures_delete_get)
router.post('/major-figures/:id/delete', MajorFiguresController.majorfigures_delete_post)
router.get('/branch/:id/delete', UmbrellaDenomController.umbrelladenom_delete_get)
router.post('/branch/:id/delete', UmbrellaDenomController.umbrelladenom_delete_post)

router.get('/denomination/:id/update', DenominationController.denomination_update_get)
router.post('/denomination/:id/update', DenominationController.denomination_update_post)
router.get('/major-figures/:id/update', MajorFiguresController.majorfigures_update_get)
router.post('/major-figures/:id/update', MajorFiguresController.majorfigures_update_post)
router.get('/branch/:id/update', UmbrellaDenomController.umbrelladenom_update_get)
router.post('/branch/:id/update', UmbrellaDenomController.umbrelladenom_update_post)

module.exports = router;