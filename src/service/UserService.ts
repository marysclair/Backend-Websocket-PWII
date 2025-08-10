import { userDb } from "../database/user";

export function findUniqueUser(username: string) {
  const userFound = userDb.find((user) => {
    return user.username === username;
  });

  if (!userFound) {
    return null;
  }

  return userFound;
}

export function findManyUsers() {
  return userDb;
}
