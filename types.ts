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
    author: {
        id: string;
        email: string;
    }
}

export type Data = { users: IUser[], todos: ITodo[] };
