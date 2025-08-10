import { Request, Response } from "express";
import { OrderService } from "../service/OrderService";
import { User } from "../model/User";
import { adminClients } from "../server";

const orderService = new OrderService();

export class OrderController {
  createOrder(req: Request, res: Response) {
    console.log("post");
    const user = req.user as User;

    const { description, address, title } = req.body;

    try {
      const order = orderService.addOrderToUser(
        user,
        title,
        description,
        address
      );
      if (order) {
        console.log(order);
        return res.status(201).send(order);
      } else {
        return res.status(400).send("Error creating order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      return res.send({ error: "Internal server error while creating order" });
    }
  }

  getAllOrders(req: Request, res: Response) {
    console.log("getallorders");
    try {
      const orders = orderService.getAllOrdersByUsers();
      return res.status(200).send(orders);
    } catch (error) {
      console.error("Error creating order:", error);
      return res.send({ error: "Internal server error while creating order" });
    }
  }

  getAllOrderByUserId(req: Request, res: Response) {
    const user = req.user as User;
    try {
      const orders = orderService.getAllOrdersByUser(user);
      return res.status(200).send(orders);
    } catch (error) {
      console.error("Error creating order:", error);
      return res.send({ error: "Internal server error while creating order" });
    }
  }

  updateOrderById(req: Request, res: Response) {
    const user = req.user as User;
    const { orderId } = req.params;

    const { address } = req.body;
    try {
      const order = orderService.updateOrderById(user, orderId, address);

      if (order) {
        // sends notification via webscoket
        adminClients.forEach((ws) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(
              JSON.stringify({
                type: "orderUpdated",
                data: {
                  orderId: order.id,
                  address: order.address,
                  userId: user.id,
                },
              })
            );
          }
        });
      }

      return res.status(200).send(order);
    } catch (error) {
      console.error("Error creating order:", error);
      return res.send({ error: "Internal server error while creating order" });
    }
  }
}
