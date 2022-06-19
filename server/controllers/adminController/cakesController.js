const uuid = require('uuid')
const path = require('path')
const cakeService = require('../../services/position-service/cakeService')
const { validationResult } = require('express-validator')
const sharp = require('sharp')
const { promisify } = require('util');
const fs = require('fs');
const convert = require('heic-convert');

const ApiError = require('../../exceptions/api-error')

class CakesController{
    async createNewCake(req, res, next){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return next(ApiError.BadRequest('Не вдалося створити нову позицію!', errors))
            }
            const {name, price, categoryId, id_sub_category, description, composition} = req.body
            const {img} = req.files
            console.log(img)
            const fileName = uuid.v4() + '.jpeg'
            if (img.mimetype = 'image/heic'){
                (async () => {
                    const outputBuffer = await convert({
                        buffer: img.data, // the HEIC file buffer
                        format: 'JPEG',        // output format
                        quality: 0.4 
                    });

                    await promisify(fs.writeFile)(path.resolve(__dirname, '..', '..', 'static', 'res', fileName), outputBuffer);
                })();
            }
            else{
                img.mv(path.resolve(__dirname, '..', '..', 'static', fileName))
                sharp(img.data)
                    .withMetadata()
                    .jpeg({ quality: 50 })
                    .toFile(path.resolve(__dirname, '..', '..', 'static', 'res', fileName))
                    .catch(e => {
                        console.log(e)
                    });
            }
            
            const cake = await cakeService.createNewCake(name, price, description, composition, categoryId, id_sub_category, fileName)

            return res.json(cake)
        }catch(e){
            next(e)
        }
    }
}

module.exports = new CakesController()