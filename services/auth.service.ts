import {DB} from './db.service';

export class AuthService {
    private DB: DB;
    constructor(DB: DB) {
        this.DB = DB
    }
    async signUp ({email, password}:{email:string; password: string}) {
        const response = await this.DB.signup({email, password})
        return response
    }
}