import { useContext } from "react";
import styles from "../thankYouPage/ThankYouPage.module.scss";
import {
  IOrder,
  IOrderSundaeContext,
  orderSundaeContext,
} from "../../../../context/orderSundae";

interface IProps {
  setStep: (step: number) => void; // use the state and return the function
  // scoopsQuantityHandler: () => void; // simple function not return value
}

const ThankYouPage = (props: IProps) => {
  const { setStep } = props;
  const { scoopsData, toppingsData, setScoopsData, setToppings } =
    useContext<IOrderSundaeContext>(orderSundaeContext);

  const handleNewOrder = () => {
    const resetScoops = scoopsData.map((item) => ({
      ...item,
      quantity: 0,
    })) as IOrder[];
    const resetToppings: IOrder[] = toppingsData.map((item) => ({
      ...item,
      quantity: 0,
    }));
    setScoopsData(resetScoops);
    setToppings(resetToppings);
    setStep(1);
  };

  return (
    <div className={styles.thankYouSection}>
      <div className={styles.thankYouDetails}>
        <div className={styles.thankYou}>{`Thank You!`}</div>
        <div className={styles.orderNumber}>{`Your order number is 10 `}</div>
        <div className={styles.orderDescription}>
          {`as per our terms and conditions, nothing will happen now`}
        </div>
        <div className={styles.orderSundaeButton}>
          <button onClick={handleNewOrder} className={styles.thankYouButton}>
            {`Create New Order`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
