const express = require("express")
const router = express.Router()

router.get('/', (req, res) => {
    res.send("User List")
})

router.post('/', (req, res) => {
    res.send('Create User')
})

router.get('/new', (req, res) => {
    res.send("User New Form")
})

router.route("/:id")
    .get((req, res) => {
        console.log(req.user)
        res.send(`User Get With ID: ${req.params.id}`)
    }).put((req, res) => {
        res.send(`User Get With ID: ${req.params.id}`)
    }).delete((req, res) => {
        res.send(`User Get With ID: ${req.params.id}`)
})

const users = [{ name: "Kyle"}, {name: "Sally"}]

/**
 * This is a middlewere function
 */
router.param("id", (req, res, next, id) => {
    req.user = users[id]
    next()
})

module.exports = router