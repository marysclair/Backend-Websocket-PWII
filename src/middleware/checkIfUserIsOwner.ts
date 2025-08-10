import { NextFunction, Request, Response } from "express";
import { findUniqueUser } from "../service/UserService";
import { User } from "../model/User";
import { OrderService } from "../service/OrderService";

const orderService = new OrderService();

export async function checkIfUserIsOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user as User;
  const { orderId } = req.params;
  const order = user.orders.some((order) => order.id === orderId);

  if (order) {
    return next();
  } else {
    return res.status(404).json({ error: "User not owns Order" });
  }
}
