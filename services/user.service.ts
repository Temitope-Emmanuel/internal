import { IUser } from '../types';
import {DB} from './db.service';

export class UserService {
    private DB: DB;
    constructor(DB: DB) {
        this.DB = DB;
    }
    async updateUser (arg:Omit<IUser, 'salt'>) {
        await this.DB.init();
        const response = await this.DB.updateUser(arg)
        return response
    }
}