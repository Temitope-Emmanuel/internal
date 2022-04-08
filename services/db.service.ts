import {join, dirname} from 'path';
import {Low, JSONFile} from 'lowdb';
import {fileURLToPath} from 'url';
import bcrypt from 'bcryptjs'

interface IUser {
    email: string;
    password: string;
    salt: string;
}

export type Data = {users: IUser[], todo: []};

export class DB {
    private db: Low<Data> | undefined;
    constructor() {
        this.init();        
    }

    private async init() {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        
        const file = join(__dirname, 'db.json');
        const adapter = new JSONFile<Data>(file);
        const db = new Low<Data>(adapter);
        
        await db.read();
        db.data ||= {users: [], todo: []}
        this.db = db;   
    }

    async signup({email, password}:{
        email: string;
        password: string;
    }) {
        try{
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);
    
            const newUser = {
                email,
                salt,
                password: hashedPassword
            }
            this.db?.data?.users.push(newUser)
            await this.db?.write()
            return({
                message: 'success',
                data: null
            })
        }catch(err){
            console.log({err})
        }
    }
}
