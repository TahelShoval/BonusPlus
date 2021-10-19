export class SignInData {
    private userName: string;
    private password: string;
    private type: string;

    constructor(userName: string, password: string, type: string) {
        this.userName = userName;
        this.password = password;
        this.type = type;
    }

    getUserName(): string {
        return this.userName;
    }

    getPassword(): string {
        return this.password;
    }

    getType() {
        return this.type;
    }
}