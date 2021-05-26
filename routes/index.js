var express = require('express');
var router = express.Router();

var cotizaciones = require('../controllers/funciones').getCotizacion;

router.get('/api/cotizaciones/ping', (req, res) => { res.json({ "status": "ok" }); });
router.get('/api/cotizaciones/', cotizaciones);

module.exports = router;