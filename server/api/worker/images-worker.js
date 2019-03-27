const Jimp = require('jimp')
const path = require('path')

const resizeImage = async (filename, size) => {
    return await new Promise((resolve, reject) => {
        Jimp.read(path.join(__dirname, `../../uploads/images/${ filename }`))
        .then(image => {
            image
            .resize(size.width, Jimp.AUTO)
            .quality(60)
            .write(path.join(__dirname, `../../uploads/images/resize/${size.width}w-${ filename }`))
            resolve(`http://localhost:3000/images/resize/${size.width}w-${ filename }`)       
        })
        .catch(err => { 
            console.error(err)
            reject('縮圖時發生錯誤')
         })
    })
}

module.exports = { resizeImage }