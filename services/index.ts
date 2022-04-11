import { AuthService } from "./auth.service";
import { DB } from "./db.service";
import { TodoService } from "./todo.service";
import { UserService } from "./user.service";

const db = new DB();

const authService = new AuthService(db);
const todoService = new TodoService(db);
const userService = new UserService(db);

export {authService, todoService, userService};