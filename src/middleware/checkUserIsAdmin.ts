import { NextFunction, Request, Response } from "express";
import { findUniqueUser } from "../service/UserService";

export async function checkUserIsAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const username = req.headers.username as string;

  const user = findUniqueUser(username);

  if (!user) {
    return res.status(401).send({ error: "User doesn't exists" });
  }

  if (user.type !== "admin") {
    return res
      .status(403)
      .send({ error: "Access denied: administrators only" });
  }

  return next();
}
