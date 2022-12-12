export default class AuthRequest{
    constructor(){
        this.username = null;
        this.password = null;
        this.email = null;
        this.roles = ['treinador'];
    }

    populate(obj){
        this.username = obj.username;
        this.password = obj.password;
        this.email = obj.email;
        this.roles = obj.roles;
    }

    toJson(){
        return{
            username: this.username,
            password: this.password,
            email: this.email,
            roles: this.roles
        }
    }
}