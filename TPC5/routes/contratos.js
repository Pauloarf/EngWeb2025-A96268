let express = require('express')
let router = express.Router()
let Contrato = require('../controllers/contrato')

router.get('/', async function(req, res, next){
    console.log(req.query);
    if(req.query.entidade){
        const respost = await Contrato.findByEntidade(req.query.entidade);
        res.send(respost); 
    } else if(req.query.tipo) {
        tipo = req.query.tipo.replace('%20',' ');
        const respost = await Contrato.findByType(tipo);
        res.send(respost);
    } else {
        const respost = await Contrato.list()
        res.send(respost);
    }
})

router.post('/', async function(req, res, next){
    const contrato = req.body;
    const resp = await Contrato.insert(contrato)
    res.send(resp);
})

router.get('/entidades', async function(req, res, next){
    const respost = await Contrato.getEntidades();
    res.send(respost);
})

router.get('/entidades/:nipc', async function(req, res, next) {
    try {
      const nipc = req.params.nipc;
      const contratos = await Contrato.findByEntidade(nipc);
      const entidade = contratos.length > 0 ? contratos[0].entidade_comunicante : 'Entidade Desconhecida';
      const totalContratos = contratos.reduce((sum, c) => sum + (c.precoContratual || 0), 0);
      
      res.render('entidade', { 
        title: `Entidade ${nipc}`,
        nipc: nipc,
        entidade: entidade,
        contratos: contratos,
        totalContratos: totalContratos
      });
    } catch (err) {
      res.render('error', {error: err});
    }
  });

router.get('/tipos', async function(req, res, next){
    const respost = await Contrato.getTipos();
    res.send(respost);
})

router.get('/:id', async function(req, res, next){
    const respost = await Contrato.findById(req.params.id);
    res.render('contrato', { contrato: respost});
})


router.delete('/:id', async function(req, res, next){
    const respost = await Contrato.delete(req.params.id);
    res.send(respost);  
})

router.put('/:id', async function(req, res, next){
    const contrato = req.body;
    const respost = await Contrato.update(contrato);
    res.send(respost);
})


module.exports = router;
