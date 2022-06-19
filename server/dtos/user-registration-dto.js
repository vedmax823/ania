
module.exports = class UserRegistrationDto {
    email;
    password;
    name;
    surname;
    phone_number;
    device_data;

    constructor(body) {
        this.email = body.email;
        this.name = body.name;
        this.surname = body.surname;
        this.password = body.password;
        this.phone_number = body.phone_number;
        this.device_data = body.device_data;
    }
}