'use strict'

const express = require('express')
const router = express.Router()
const fileUploader = require('../config/files/file-storage')
const imagesWorker = require('./worker/images-worker')
const Response = require('../response')

router.post('/images', fileUploader.any(), (req, res, next) => {
    (!req.files.length)
    ? Response.send(res, 500, Response.Message('上傳失敗'))  
    : Response.send(res, 201, Response.Message(`上傳成功！檔案名稱：${ req.files[0].filename }`))
})

router.patch('/images', async (req, res, next) => {
    try {
        const imageURL = await imagesWorker.resizeImage(req.body.filename, { width: Number(req.body.width) })
        Response.send(res, 200, Response.Message(imageURL))
    }
    catch(e) {
        Response.send(res, 500, Response.Message(e))
    }
})

module.exports = router