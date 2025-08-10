import express from "express";
import { OrderController } from "../controller/OrderController";
import { checkExistsUserAccount } from "../middleware/checkExistsUserAccount";
import { checkUserIsAdmin } from "../middleware/checkUserIsAdmin";
import { checkIfUserIsOwner } from "../middleware/checkIfUserIsOwner";

const orderController = new OrderController();
export const orderRouter = express.Router();

orderRouter.post("/", checkExistsUserAccount, orderController.createOrder);
orderRouter.get("/", checkUserIsAdmin, orderController.getAllOrders);
orderRouter.get(
  "/user",
  checkExistsUserAccount,
  orderController.getAllOrderByUserId
);
orderRouter.patch(
  "/:orderId",
  checkExistsUserAccount,
  checkIfUserIsOwner,
  orderController.updateOrderById
);
