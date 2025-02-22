// Estas variáveis são necessárias para o funcionamento do router
const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    fetch('http://localhost:3000/alunos').then(
        async response => {
            const alunos = await response.json()
            res.render('alunos', {alunos})
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
    fetch(`http://localhost:3000/alunos?id=${id}`).then(
        async response => {
            const aluno = await response.json()
            res.render('aluno', {aluno: aluno[0]})
        }
    ).catch(
        async error => {
            console.log(error)
            res.sendStatus(500)
        }
    )
})

// Esta variável exporta o router para ser usado no server.js
module.exports = router