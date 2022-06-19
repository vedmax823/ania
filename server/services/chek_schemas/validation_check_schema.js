const {checkDeviceData} = require('./check-services')

const refresh_check_schema = {
    device_data : {
        custom : {
            options : device_data => checkDeviceData(device_data)
        }
    }
}

const login_check_schema = {
    email : {
        isEmail : true,
        errorMessage : "Не вірний формат email1!"
    },
    password : {
        isLength: {
            options : {min : 5, max : 100},
            errorMessage : 'Закороткий чи задовгий пароль'
        } 
    },
    ...refresh_check_schema
}

const registration_check_schema = {
    ...login_check_schema
    ,
    phone_number : {
        isMobilePhone : true,
        errorMessage : "Не вірний номер мобільного"
    },
    name : {
        isLength : {
            options : {min : 1, max : 100},
            errorMessage : 'Дуже коротке імʼя!'
        }
    },
    surname : {
        isLength : {
            options : {min : 1, max : 100},
            errorMessage : 'Дуже коротке пизвіще!'
        }
    }
}

module.exports = {
    refresh_check_schema,
    login_check_schema,
    registration_check_schema
}


