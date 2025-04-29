import { createContext, useState } from "react";
import { scoops, toppings } from "../../constant";

export interface IOrder {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrderSundaeContext {
  scoopsData: IOrder[] | [];
  toppingsData: IOrder[] | [];
  setScoopsData: any;
  setToppings: any;
  calculateTotal: any;
  calculateGrandTotal: any;
}

const orderSundaeContext: any = createContext({
  scoopsData: [],
  toppingsData: [],
});

const OrderSundaeProvider = ({ children }: any) => {
  const [scoopsData, setScoopsData] = useState<IOrder[]>(scoops);
  const [toppingsData, setToppings] = useState<IOrder[]>(toppings);

  const calculateTotal = (data: any) => {
    let subTotal = data.reduce(
      (total: any, item: any) => total + item.price * item.quantity,
      0
    );
    return subTotal;
  };

  const calculateGrandTotal = () => {
    const scoopTotal = scoopsData.filter((item) => item.quantity > 0);
    const toppingTotal = toppingsData.filter((item) => item.quantity > 0);
    const scoopSubTotal = calculateTotal(scoopTotal);
    const toppingSubTotal = calculateTotal(toppingTotal);
    return scoopSubTotal + toppingSubTotal;
  };

  const value = {
    scoopsData,
    toppingsData,
    setScoopsData,
    setToppings,
    calculateTotal,
    calculateGrandTotal,
  };

  return (
    <orderSundaeContext.Provider value={value}>
      {children}
    </orderSundaeContext.Provider>
  );
};

export default OrderSundaeProvider;
export { orderSundaeContext };
