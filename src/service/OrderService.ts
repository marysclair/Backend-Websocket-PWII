import { userDb } from "../database/user";
import { Order } from "../model/Order";
import { User } from "../model/User";
import { v4 as uuidv4 } from "uuid";
import { adminClients } from "../server";

export class OrderService {
  findUniqueUserOrder(user: User, id: string) {
    const foundOrder = user.orders.find((Order) => {
      return Order.id === id;
    });

    if (!foundOrder) {
      return null;
    }

    return foundOrder;
  }

  findManyUserOrders(user: User) {
    return user.orders;
  }

  addOrderToUser(
    user: User,
    title: string,
    description: string,
    address: string
  ) {
    const order: Order = {
      id: uuidv4(),
      title,
      description,
      date: new Date(),
      address,
    };

    user.orders.push(order);

    return order;
  }

  getAllOrdersByUsers() {
    const orders: Order[] = userDb.flatMap((user) => user.orders);
    return orders;
  }

  getAllOrdersByUser(user: User) {
    const orders: Order[] = user.orders;
    return orders;
  }

  updateOrderById(user: User, orderId: string, address: string) {
    const order = this.findUniqueUserOrder(user, orderId);
    if (!order) return null;

    order.address = address;

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

    return order;
  }
}
