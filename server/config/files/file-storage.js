'use strict'

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        const path = 'uploads/images/'
        callback(null, path)
    },
    filename: function(req, file, callback) {
        callback(null, `${ new Date().valueOf() }-${ file.originalname }`)
    }
})

const upload = multer({ storage: storage })

module.exports = upload