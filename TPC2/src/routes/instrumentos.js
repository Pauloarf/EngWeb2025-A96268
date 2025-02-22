// Estas variáveis são necessárias para o funcionamento do router
const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    fetch('http://localhost:3000/instrumentos').then(
        async response => {
            const instrumentos = await response.json()

            res.render('instrumentos', {instrumentos/*: renamedInstrumentos*/})
        }
    ).catch(
        async error => {
            console.log(error)
            res.sendStatus(500)
        } 
    )
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    fetch(`http://localhost:3000/instrumentos/${id}`).then(
        async response => {
            const instrumento = await response.json()
            fetch(`http://localhost:3000/alunos?instrumento=${instrumento['#text']}`).then(
                async response2 => {
                    const alunos = await response2.json()
                    res.render('instrumento', {alunos: alunos, instrumento: instrumento})
                }
            ).catch(
                async error => {
                    console.log('Erro no fetch dos alunos\n' + error)
                    res.sendStatus(500)
                }
            )
        }
    ).catch(
        async err => {
            console.log('Erro no fetch do instrumento\n' + err)
            res.sendStatus(500)
        }
    )  
})

// Esta variável exporta o router para ser usado no server.js
module.exports = router
