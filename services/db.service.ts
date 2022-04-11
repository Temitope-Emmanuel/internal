import { join, dirname } from 'path';
import { Low, LocalStorage, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

export interface IUser {
    id: string;
    email: string;
    password: string;
    salt: string;
}

export interface ITodo {
    id: string;
    type: 'completed' | 'todo';
    title: string;
    description: string;
}

export type Data = { users: IUser[], todos: ITodo[] };

export class DB {
    private db: Low<Data> | undefined;
    constructor() {
        // this.init();
    }

    async init() {
        const __dirname = dirname(fileURLToPath(import.meta.url));

        const file = join(__dirname, 'db.json');
        const adapter = new JSONFile<Data>(file);
        const db = new Low<Data>(adapter);
        await db?.read();
        db.data = db.data || { todos: [], users: [] }
        this.db = db;
    }

    private async update() {
        await this.db?.write();
        await this.db?.read();
    }

    async signup({ email, password }: {
        email: string;
        password: string;
    }) {
        try {
            const foundUser = this.db?.data?.users.find(item => item.email === email)
            if(foundUser){
                return({
                    message: 'user already exist',
                    data: null
                })
            }
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const newUser = {
                id: nanoid(),
                email,
                salt,
                password: hashedPassword
            }
            this.db?.data?.users.push(newUser)
            await this.update();
            return ({
                message: 'success',
                data: {
                    email,
                    id: newUser.id
                }
            })
        } catch (err) {
            console.log({ err })
        }
    }

    async login({ email, password }: { email: string, password: string }) {
        try {
            const foundIdx = this.db?.data?.users.findIndex(item => item.email === email)
            if (foundIdx !== -1) {
                const foundUser = this.db?.data?.users[foundIdx as number]
                if (!foundUser) {
                    return ({
                        message: 'user not found',
                        data: null
                    })
                }
                const hashedPassword = bcrypt.hashSync(password, foundUser.salt)
                if (hashedPassword !== foundUser.password) {
                    return ({
                        message: 'incorrect password',
                        data: null
                    })
                }
                return ({
                    message: 'success login',
                    data: {
                        email,
                        id: foundUser.id
                    }
                })
            } else {
                return ({
                    message: 'unable to find user with email',
                    data: null
                })
            }
        } catch (err) {
            console.log({ err })
        }
    }

    async updateUser(newUser: Omit<IUser, 'salt'>) {
        try {
            const foundIdx = this.db?.data?.users.findIndex(item => item.id === newUser.id)
            if (foundIdx !== -1) {
                const foundUser = this.db?.data?.users[foundIdx as number]
                const hashedPassword = bcrypt.hashSync(newUser.password,foundUser!.salt)
                const updatedUser = {
                    ...foundUser,
                    ...newUser,
                    password: hashedPassword
                }
                console.log('this is the updated user',updatedUser)
                this.db?.data?.users.splice(foundIdx as number, 1, updatedUser as any)
                await this.update();
                return ({
                    message: 'update user successful',
                    data: {
                        id: updatedUser.id,
                        email: updatedUser.email,
                    }
                })
            } else {
                return ({
                    message: 'unable to get data',
                })
            }
        } catch (err) {
            console.log({ err })
        }
    }

    async createTodo({ description, title }: Omit<ITodo, 'id' | 'type'>) {
        try {
            const newTodo: ITodo = {
                id: nanoid(),
                title,
                description,
                type: 'completed',
            }
            this.db?.data?.todos.push(newTodo)
            await this.update();
            return ({
                message: 'success',
                data: this.db?.data?.todos
            })
        } catch (err) {
            console.log({ err })
        }
    }
    async getTodo() {
        return this.db?.data?.todos
    }

    async updateTodo(id: string, newTodo: Partial<ITodo>) {
        const foundIdx = this.db?.data?.todos.findIndex(item => item.id === id)
        if (foundIdx && foundIdx !== -1) {
            const updatedTodo = {
                ...this.db?.data?.todos[foundIdx],
                ...newTodo
            }
            this.db?.data?.todos.splice(foundIdx, 1, updatedTodo as any)
            await this.update();
            return ({
                message: 'update successful',
                data: this.db?.data?.todos
            })
        } else {
            return ({
                message: 'unable to get data',
            })
        }
    }

    async deleteTodo(id: string) {
        try {
            const foundIdx = this.db?.data?.todos.findIndex(item => item.id === id)
            if (foundIdx !== -1) {
                this.db?.data?.todos.splice(foundIdx as number, 1)
                await this.update()
                return ({
                    message: 'deleted successful',
                    data: this.db?.data?.todos
                })
            } else {
                return ({
                    message: 'unable to get data',
                    data: null
                })
            }
        } catch (err) {
            return ({
                message: err,
                data: null
            })
        }
    }
}

