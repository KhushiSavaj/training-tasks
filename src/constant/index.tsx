import { ITasks } from "../components/tasks";
import { IOrder } from "../context/orderSundae";

export const tasks: ITasks[] = [
  {
    id: 1,
    title: "Counter App  ",
    description:
      "Count the value using a class component with Increment and Decrement,state methods, and updates the value using the setState method.",
  },
  {
    id: 2,
    title: "Greeting Component",
    description:
      "Create a Greeting Component that takes a name as a prop and displays a personalized message.",
  },
  {
    id: 3,
    title: "Form Handling",
    description:
      "Create a form with validation that stores and displays data on submission.",
  },
  {
    id: 4,
    title: "Todo List",
    description:
      "Build a simple todo list where users can add and remove tasks using state and list rendering.",
  },
  {
    id: 5,
    title: "E commerce",
    description:
      "Build a simple todo list where users can add and remove tasks using state and list rendering.",
  },
];

export const scoops: IOrder[] = [
  {
    id: 1,
    image: "/images/Chocolate.png",
    name: "Chocolate",
    price: 10,
    quantity: 0,
  },
  {
    id: 2,
    image: "/images/Vanilla.png",
    name: "Vanilla",
    price: 20,
    quantity: 0,
  },
  {
    id: 3,
    image: "/images/MintChip.png",
    name: "Mint Chip",
    price: 30,
    quantity: 0,
  },
];

export const toppings: IOrder[] = [
  {
    id: 1,
    image: "/images/Gummibears.png",
    quantity: 0,
    price: 40,
    name: "Gummi bears",
  },
  {
    id: 2,
    image: "/images/Coldcherrie.png",
    quantity: 0,
    price: 30,
    name: "Coldcherrie",
  },
  {
    id: 3,
    image: "/images/HotFudge.png",
    quantity: 0,
    price: 60,
    name: "Hot Fudge",
  },
  {
    id: 4,
    image: "/images/Caramel.png",
    quantity: 0,
    price: 50,
    name: "Caramel",
  },
  {
    id: 5,
    image: "/images/Cherrie.png",
    quantity: 0,
    price: 20,
    name: "Cherrie",
  },
  {
    id: 6,
    image: "/images/Strawberry.png",
    quantity: 0,
    price: 30,
    name: "Strawberry",
  },
];
