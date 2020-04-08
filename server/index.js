const express = require('express')
const massive = require('massive')
require('dotenv').config()
const productCtrl = require('./controllers/products_controller')

const app = express()
const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    app.set('db', dbInstance)
    app.listen(SERVER_PORT, console.log(`Server is up and running on port ${SERVER_PORT}`))
}).catch(err => console.log(err))

app.post('/api/products', productCtrl.create)
app.get('/api/products/:id', productCtrl.getOne)
app.get('/api/products', productCtrl.getAll)
app.put('/api/products/:id', productCtrl.update)
app.delete('/api/products/:id', productCtrl.delete)