import { Order } from "@/dtos/Order.dto";
import { EventEmitter } from "events";
import { getRandomId, getRandomInterval } from "./utils";

export class OrderOrchestrator {
  private interval: NodeJS.Timeout | undefined;
  private maxOrders: number = getRandomInterval(10, 30);
  private eventEmitter = new EventEmitter();

  private emit(order: Order) {
    this.eventEmitter.emit("order", order);
  }

  public run() {
    this.interval = setInterval(() => {
      this.emit({
        id: getRandomId(),
        state: "PENDING",
        items: [
          {
            id: getRandomId(),
            name: "Item - " + getRandomId(),
            image: "img/burger.png",
            price: { currency: "EUR", amount: 10 },
          },
          {
            id: getRandomId(),
            name: "Item - " + getRandomId(),
            image: "img/burger.png",
            price: { currency: "EUR", amount: 15 },
          },
        ],
      });
      this.maxOrders--;
      if (this.maxOrders <= 0) {
        clearInterval(this.interval);
      }
    }, 1000);
    return this.eventEmitter;
  }
}
