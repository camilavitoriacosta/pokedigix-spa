export default class LoginDTO {
    constructor() {
        this.username = null;
        this.password = null;
    }

    populate(obj) {
        this.username = obj.username;
        this.password = obj.password;
    }

    toJson() {
        return {
            username: this.username,
            password: this.password,
        }
    }
}