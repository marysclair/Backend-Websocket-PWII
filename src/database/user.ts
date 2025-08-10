import { User } from "../model/User";
import { UserAdmin } from "../model/UserAdmin";

export const userDb: User[] = [
  {
    id: "574fc54f-692b-49c2-908c-f2093ed15314",
    username: "clara",
    email: "clara@gmail.com",
    type: "user",
    orders: [],
  },
  {
    id: "574fc54f-692b-49c2-908c-f2093ed15314",
    username: "gabi",
    email: "gabi@gmail.com",
    type: "user",
    orders: [],
  },
  {
    id: "b774c88c-b3f5-47d0-850c-50d4792e2f68",
    username: "mauricio",
    email: "mauecio@gmail.com",
    type: "user",
    orders: [],
  },
  {
    id: "5f120b19-3eab-4f87-8c96-30ce7549f584",
    username: "admin",
    email: "admin@gmail.com",
    type: "admin",
    orders: [],
  } as UserAdmin,
];
