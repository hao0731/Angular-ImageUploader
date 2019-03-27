'use strict'

const express = require('express')
const router = express.Router()
const fileUploader = require('../config/files/file-storage')
const imagesWorker = require('./worker/images-worker')
const Response = require('../response')

router.post('/images', fileUploader.any(), (req, res, next) => {
    Response.send(res, 201, Response.Message('Done'))
})

router.get('/images/size/:width/:filename', async (req, res, next) => {
    try {
        const imageURL = await imagesWorker.resizeImage(req.params.filename, { width: Number(req.params.width) })
        Response.send(res, 200, Response.Message(imageURL))
    }
    catch(e) {
        Response.send(res, 500, Response.Message(e))
    }
})

module.exports = router