'use strict'

const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, path.join(__dirname, '../../uploads/images/'))
    },
    filename: function(req, file, callback) {
        callback(null, `${ new Date().valueOf() }-${ file.originalname }`)
    }
})

const upload = multer({ storage: storage })

module.exports = upload