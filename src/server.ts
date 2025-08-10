import express from "express";
import cors from "cors";
import { router } from "./routes";
import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
app.use(express.json());
app.use(cors());

const server = createServer(app);
const wss = new WebSocketServer({ server });

const port = 2626;

// creates websocket
export const adminClients = new Set<WebSocket>();

wss.on("connection", (ws, req) => {
  ws.on("message", (message) => {
    if (message.toString() === "admin") {
      adminClients.add(ws);
      console.log("Admin connected");
    }
  });

  ws.on("close", () => {
    adminClients.delete(ws);
    console.log("Client disconnected");
  });
});

app.use(router);

server.listen(port, () => {
  console.log("Escutando na porta: ", port);
});
