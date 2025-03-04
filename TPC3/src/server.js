const express = require('express')
const fs = require('fs')

const { pageList, myDateTime, myName, myTurma } = require('./misc')
const treinosRouter = require('./routes/treinos')

const app = express()

app.set('view engine', 'ejs')
app.use(logger)
app.use(express.static("./public"))
app.listen(3001)

console.log('Server listening at port 3001')

// Render Main Page
app.get('/', (req, res) => {
    res.render("mainPage.ejs", 
        { pageList: pageList, author: myName(), date: myDateTime()}
    )
})

// Setting up routers
app.use('/treinos', treinosRouter)

// MiddleWare to logg information
function logger(req, res, next){
    console.log(req.method + ' RECIEVED at ' + myDateTime())
    console.log('URL: ' + req.originalUrl)
    next()
}