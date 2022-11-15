const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({
        info: 'Node.js, Express, and Postgres API'
    })
})


app.get('/driver/:id', db.getUsers)
app.post('/driver/create', db.createDriver)
app.put('/driver/update/:id', db.updateDriver)
app.delete('/driver/delete/:id', db.deleteDriver)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})