'use strict'

const express = require('express')
const logger = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const PORT = 3000

const api = require('./api')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.use('/images', express.static(path.join(__dirname, 'uploads/images')))

app.use('/api', api)

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${ PORT }`)
})