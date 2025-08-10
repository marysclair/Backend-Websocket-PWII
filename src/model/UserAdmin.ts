import { User } from "./User";

export interface UserAdmin extends User {
  type: "admin";
}
