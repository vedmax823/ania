require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const model_user = require('./models/users_model')
const model_token = require('./models/token_model')
const model_category = require('./models/admin_model')
const model_cakes = require('./models/cake_model')
const fileUpload = require('express-fileupload')
const router = require('./routers/index')
const error_middleware = require('./middlewares/error-middleware')
const path = require('path')


const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(error_middleware)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync({alter : true})
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    }
    catch(e){
        console.log(e)
    }
}


start()
