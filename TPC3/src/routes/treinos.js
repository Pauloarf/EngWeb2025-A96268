// Estas variáveis são necessárias para o funcionamento do router
const express = require("express")
const router = express.Router()
const { pageList } = require('../misc')

// Usamo isto para conseguir ler o body
router.use(express.json())
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    fetch('http://localhost:3000/treinos').then(
        async response => {
            const treinos = await response.json()

            res.render('treinos', {pageList: pageList, treinos: treinos})
        }
    ).catch(
        async error => {
            console.log(error)
            res.sendStatus(500)
        } 
    )
})

router.get('/register', (req, res) => {
    res.render('formRegister', {pageList: pageList})
})


router.post('/register', async (req, res) => {
    try {
        const configResponse = await fetch('http://localhost:3000/config')
        const config = await configResponse.json()
        console.log(config)
        const nextID = config.nextID

        const newTreino = {...req.body, id: "t" + nextID}
        const updatedConfig = { ...config, nextID: nextID + 1 };

        await fetch('http://localhost:3000/config', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedConfig),
        });

        const treinoResponse = await fetch('http://localhost:3000/treinos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTreino),
        });

        const treinoData = await treinoResponse.json();
        console.log('New Treino:', treinoData);
        res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'})
        res.write("Success!")
        res.end("<p><a href=\"http://localhost:3001/treinos/register\">Voltar</a></p>")
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


router.get('/delete/:id', async (req, res) => {
    const treinoID = req.params.id;
    try {
        const response = await fetch(`http://localhost:3000/treinos/${treinoID}`, {
            method: 'DELETE',
        })
        if(response.ok){
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.write("Treino removido com sucesso")
            res.end("<p><a href=\"http://localhost:3001/treinos\">Voltar</a></p>")
        } else {
            const errorData = await response.json();
            console.error('Error from JSON Server:', errorData);
            res.status(500).send("ERRO: Não foi possível eliminar o treino.");
        }
        
    } catch (error) {
        console.error('Error:', error)
        res.status(500).send("ERRO: " + error)
    }
})

router.get('/edit/:id', async (req, res) => {
    const treinoID = req.params.id;
    try {
        const response = await fetch(`http://localhost:3000/treinos/${treinoID}`)
        const treino = await response.json()
        res.render('formEdit', {pageList, treino} )
    } catch (error) {
        console.error('Error:', error)
        res.status(500).send("ERRO: " + error)
    }
})

router.post('/edit/:id', async (req, res) => {
    const treinoID = req.params.id;

    try {
        const updatedTreino = { ...req.body, id: treinoID };
        console.log('Updated Treino:', updatedTreino);

        const response = await fetch(`http://localhost:3000/treinos/${treinoID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTreino),
        });

        if (response.ok) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.write("Success!");
            res.end("<p><a href=\"http://localhost:3001/treinos\">Voltar</a></p>");
        } else {
            const errorData = await response.json();
            console.error('Error from JSON Server:', errorData);
            res.status(500).send("ERRO: Não foi possível atualizar o treino.");
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("ERRO: Ocorreu um erro no servidor.");
    }
});

/*
router.get('/:id', (req, res) => {
    const id = req.params.id
    fetch(`http://localhost:3000/items/${id}`).then(
        async response => {
            const item = await response.json()
            fetch(`http://localhost:3000/alunos?items=${item['#text']}`).then(
                async response2 => {
                    const alunos = await response2.json()
                    res.render('item', {alunos: alunos, item: item})
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
            console.log('Erro no fetch do item\n' + err)
            res.sendStatus(500)
        }
    )  
})
*/
// Esta variável exporta o router para ser usado no server.js
module.exports = router
