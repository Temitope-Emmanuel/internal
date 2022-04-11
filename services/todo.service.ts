import {DB, ITodo} from './db.service';

export class TodoService {
    private DB: DB;
    constructor(DB: DB) {
        this.DB = DB
    }
    async createTodo ({title, description}:{title:string; description: string}) {
        await this.DB.init();
        const response = await this.DB.createTodo({title,description})
        return response
    }
    async getTodo () {
        await this.DB.init();
        const response = await this.DB.getTodo()
        return response
    }
    async updateTodo (id:ITodo['id'], type: ITodo['type']) {
        await this.DB.init();
        const response = await this.DB.updateTodo(id, {type})
        return response
    }
    async deleteTodo (id: ITodo['id']) {
        await this.DB.init();
        const response = await this.DB.deleteTodo(id)
        console.log('this is the response', {response})
        return response
    }   
}