# Pink's KDS: Krazy Display Service

## What is this project?
This project is a solution to the Kanban challenge for order and rider management in a shop, simulating the receipt of orders from Glovo and allowing the team to operate the workflow efficiently.

## How to run the project?
i) Clone the repository:
Choose the option that best suits you.

- Using ssh method:
```bash
git clone git@github.com:pinkshq/pinks-tech-test-kds.git
```

- Using http method:
```bash
git clone https://github.com/pinkshq/pinks-tech-test-kds.git
```

ii) Install the dependencies:
```bash
npm install
```

iii) Launch app:
```bash
npm run dev
```

iv) Open your browser at:
```bash
http://localhost:3000
```

## What was required for in the challenge?
In this challenge, you will be faced with the task of managing several orders simultaneously using your skills and creativity to solve a unique problem: orders are shipped via Glovo, and we need to enable our in-store team to operate the Kanban in order to deliver the orders to the riders efficiently.

## What was implemented from the challenge?
- Functional Kanban:
- Orders flow between columns: Pending → In preparation → Ready.
- Riders show up and pick up ready orders.
- The team can move orders and deliver them visually and intuitively.

Centralised status management:
- Use of React Context for orders and riders.
- Simulation of order and rider arrival.

## What improvements and extras were added?
- Drag & Drop:
You can drag and drop orders between columns to change their status.
- Delivered orders history:
Dedicated section to view all delivered orders.
- Visual notifications:
Toasts for new orders and riders.
- Order details in modal:
When you click on an order, you can see a modal with details of the burger, ingredients, image and price.
- Mock of different burgers per order:
Each order has different burgers, with realistic and visual data.
- UI/UX:
Order states displayed in a user-readable format.

## Contribution

Made with ❤️ by [Luis](https://github.com/luislucena16)

