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
- Functional Kanban Board:
Orders smoothly flow through columns representing stages: Pending → In Preparation → Ready.
Riders appear to pick up ready orders, enabling a clear, visual, and intuitive workflow for the team.

- Centralized Status Management:
Leveraged React Context API to centrally manage the state of orders and riders, ensuring synchronized updates across the system.
Included simulation of order and rider arrivals to mimic real-time operations.

## What improvements and extras were added?
- Drag & Drop Interaction:
Users can easily drag and drop orders between different status columns, streamlining order management and allowing quick updates.

- Delivered Orders History:
A dedicated section records all delivered orders, providing traceability and operational insights.

- Visual Notifications:
Implemented toast notifications for new orders and rider arrivals to keep the team promptly informed.

- Detailed Order View Modal:
Clicking on any order opens a modal displaying detailed information such as burger types, ingredients, images, and pricing — enhancing clarity and decision-making.

- Realistic Mock Data for Burgers:
Each order features unique burger data with realistic visuals and information, improving the demo’s authenticity.

- Improved UI/UX:
Order statuses are presented in a clear, user-friendly format that improves readability and usability.

### Additional Features:

- Time tracking per order, with color-coded alerts for critical delays.

- Dashboard showing workload distribution across order stages and rider availability.

- Priority flags for urgent orders.

- Audio alerts for new orders and critical timing notifications.

## How can it improve kitchen operations?
With the functionalities I implemented, KDS improves kitchen operations in these ways:

- Visual and intuitive workflow:
The Kanban system together with drag & drop functionality allows the team to move orders quickly between states, reducing management time, errors and improving the clarity of the operational flow.

- Visual and audible alerts:
Immediate notifications alert the team to the arrival of new orders and riders, and generate alerts when an order exceeds the estimated kitchen time. This ensures that staff are always aware and can make timely decisions.

- Alarm for out-of-time orders:
When an order exceeds a critical threshold (e.g. 15 minutes in ‘In Preparation’), an audible and visual alert is triggered, allowing quick identification and immediate action, avoiding delivery delays and potential customer complaints.

- Order prioritisation:
The ability to mark orders as a priority allows you to address exceptions in a timely manner, meeting special commitments or correcting delays, significantly improving the customer experience.

- Time control and metrics:
Real-time visualisation of the elapsed time of each order, along with delivery history and performance metrics, allows you to detect bottlenecks, optimise resources and better plan production.

- Coordination with riders:
Simulation and visualisation of riders facilitates the collection of ready orders, avoiding accumulations in the kitchen and improving the organisation of order dispatch.

- Improved communication:
By centralising all relevant information in a single system - including details of each order, its status and alerts - verbal queries and errors are reduced, resulting in a more orderly and efficient kitchen.

## References to Industry-Standard KDS Software
Many modern KDS platforms implement similar core features, validating this approach:

- [Toast KDS](https://pos.toasttab.com/):
Uses a Kanban-style interface with drag & drop order management, detailed item views, and audio/visual alerts to streamline kitchen operations.

- [Square KDS](https://squareup.com/us/en/point-of-sale/restaurants):
Offers centralized order tracking, status updates, and prioritized alerts with an intuitive drag & drop UI, supporting efficient order flow.

- [Lightspeed KDS](https://www.lightspeedhq.com/pos/restaurant/kitchen-display-system/):
Features real-time updates, detailed order views, priority management, and sound notifications to optimize kitchen throughput.

## Contribution

Made with ❤️ by [Luis](https://github.com/luislucena16)

