import { Order } from "@/dtos/Order.dto";
import { EventEmitter } from "events";
import { getRandomId, getRandomInterval } from "./utils";

const burgerMenu = [
  {
    name: "Classic Burger",
    image: "https://img.icons8.com/color/96/hamburger.png",
    ingredients: "Beef, lettuce, tomato, cheese, ketchup",
    price: { currency: "EUR", amount: 8.99 },
  },
  {
    name: "Cheese Bacon Burger",
    image: "https://img.icons8.com/color/96/hamburger.png",
    ingredients: "Beef, bacon, cheddar, pickles, BBQ sauce",
    price: { currency: "EUR", amount: 10.49 },
  },
  {
    name: "Veggie Burger",
    image: "https://img.icons8.com/color/96/hamburger.png",
    ingredients: "Veggie patty, lettuce, tomato, vegan cheese",
    price: { currency: "EUR", amount: 7.99 },
  },
  {
    name: "Spicy Chicken Burger",
    image: "https://img.icons8.com/color/96/hamburger.png",
    ingredients: "Chicken, jalapeños, lettuce, spicy mayo",
    price: { currency: "EUR", amount: 9.49 },
  },
  {
    name: "Double Deluxe Burger",
    image: "https://img.icons8.com/color/96/hamburger.png",
    ingredients: "Double beef, double cheese, onion rings, sauce",
    price: { currency: "EUR", amount: 12.99 },
  },
];

function getRandomBurgers() {
  const count = getRandomInterval(1, 3);
  const shuffled = burgerMenu.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((b) => ({
    id: getRandomId(),
    name: b.name,
    image: b.image,
    price: b.price,
    ingredients: b.ingredients,
  }));
}

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
        items: getRandomBurgers(),
      });
      this.maxOrders--;
      if (this.maxOrders <= 0) {
        clearInterval(this.interval);
      }
    }, 2000);
    return this.eventEmitter;
  }
}
