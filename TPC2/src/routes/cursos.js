// Estas variáveis são necessárias para o funcionamento do router
const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    fetch('http://localhost:3000/cursos').then(
        async response => {
            const cursos = await response.json()
            res.render('cursos', {cursos})
        }
    ).catch(
        async err => {
            console.log(err)
            res.sendStatus(500)
        }
    )
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    fetch(`http://localhost:3000/cursos/${id}`).then(
        async response => {
            const curso = await response.json()
            fetch(`http://localhost:3000/alunos?curso=${id}`).then(
                async response2 => {
                    const alunos = await response2.json()
                    res.render('curso', {alunos: alunos, curso: curso})
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
            console.log('Erro no fetch do curso\n' + err)
            res.sendStatus(500)
        }
    )  
})

// Esta variável exporta o router para ser usado no server.js
module.exports = router

