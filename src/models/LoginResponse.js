export default class LoginResponse {
    constructor() {
	    this.id = null;
        this.accessToken = null;
	    this.tokenType = null;
	    this.username = null;
	    this.email = null;
	    this.roles = [];
    }

    populate(obj) {
        this.id = obj.id;
        this.accessToken = obj.accessToken;
	    this.tokenType = obj.tokenType;
	    this.username = obj.username;
	    this.email = obj.email;
	    this.roles = obj.roles;
    }

    toJson() {
        return {
            id: this.id,
            accessToken: this.accessToken,
            tokenType: this.tokenType,
            username: this.username,
            email: this.email,
            roles: this.roles
        }
    }
}