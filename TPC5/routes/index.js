var express = require('express');
var router = express.Router();
let Contrato = require('../controllers/contrato')

/* GET home page. */
router.get('/', async function(req, res, next) {
	try {
		const listaContratos = await Contrato.list();

		for (const contrat of listaContratos) {
			console.log((contrat['objectoContrato']));
			console.log(JSON.stringify(contrat, null, 2));
		}

		res.render('index', { title: 'Lista de Contratos', contratos: listaContratos});
	} catch (err) {
		res.render('error', {error: err});
	}
});

module.exports = router;
