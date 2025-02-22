const express = require('express')
const fs = require('fs')

const { myDateTime, myName, myTurma } = require('./misc')
const alunosRouter = require('./routes/alunos')
const instrumentosRouter = require('./routes/instrumentos')
const cursosRouter = require('./routes/cursos')

// Definição das imagens
const pic501 = require('fs').readFileSync('./Errors/501.jpg');
const pic404 = require('fs').readFileSync('./Errors/404.jpg');
const pic500 = require('fs').readFileSync('./Errors/500.jpg');

const app = express()
const favicon = fs.readFileSync('./music.png')

const pageList = [
    {name: 'Lista de Alunos', url: '/alunos'},
    {name: 'Lista de Cursos', url: '/cursos'},
    {name: 'Lista de Instrumentos', url: '/instrumentos'},
]

app.set('view engine', 'ejs')
app.use(logger)
app.use(express.static("./public"))
app.listen(3001)

console.log('Server listening at port 3001')

// Render Main Page
app.get('/', (req, res) => {
    res.render("mainPage", 
        { pageList: pageList, author: myName(), date: myDateTime()}
    )
})

// Render favicon
app.get('/favicon.ico', (req, res) => {
    res.writeHead(200, {'Content-Type': 'image/x-icon'})
    res.end(favicon)
})

// Setting up routers
app.use('/alunos', alunosRouter)
app.use('/instrumentos', instrumentosRouter)
app.use('/cursos', cursosRouter)

// Render error page
app.use((req, res) => {
    res.status(404).type('png').send(pic404);
});

// Render error page
app.use((req, res) => {
    res.status(500).type('png').send(pic500);
});



// Every middleware takes a req, res, and next
function logger(req, res, next){
    console.log(req.method + ' RECIEVED at ' + myDateTime())
    console.log('URL: ' + req.originalUrl)
    next()
}


