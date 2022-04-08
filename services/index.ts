import { AuthService } from "./auth.service";
import { DB } from "./db.service";

const db = new DB()

const authService = new AuthService(db)

export {authService};