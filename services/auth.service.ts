import {DB} from './db.service';

export class AuthService {
    private DB: DB;
    constructor(DB: DB) {
        this.DB = DB;
    }
    async signUp ({email, password}:{email:string; password: string}) {
        await this.DB.init()
        const response = await this.DB.signup({email, password})
        return response
    }
    async login({email, password}: {email: string, password: string}) {
        await this.DB.init()
        const response = await this.DB.login({email, password})
        return response;
    }
}