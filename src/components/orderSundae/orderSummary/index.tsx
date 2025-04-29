import { useContext, useState } from "react";
import styles from "../orderSummary/OrderSummary.module.scss";
import {
  IOrderSundaeContext,
  orderSundaeContext,
} from "../../../context/orderSundae";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";

interface IProps {
  setStep: (step: number) => void; // use the state and return the function
  // scoopsQuantityHandler: () => void; // simple function not return value
}

const OrderSummary = (props: IProps) => {
  const { setStep } = props;
  const { scoopsData, toppingsData, calculateTotal, calculateGrandTotal } =
    useContext<IOrderSundaeContext>(orderSundaeContext);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!agree) {
      setError(true);
    } else {
      setError(false);
      setStep(3);
    }
  };

  return (
    <div className={styles.orderSummary}>
      <div className={styles.backPage} onClick={() => setStep(1)}>
        <ArrowBackIosIcon />
        {`Back`}
      </div>
      <div className={styles.summaryHeading}>{`Order summary`}</div>
      <div className={styles.orderSummarySection}>
        <div className={styles.orderName}>
          {`Scoops:`}
          <div className={styles.rupeesIcon}>
            <CurrencyRupeeOutlinedIcon />
            {calculateTotal(scoopsData)}
          </div>
        </div>
        <ul className={styles.orderItems}>
          {scoopsData
            .filter((item) => item.quantity > 0)
            .map((item) => (
              <li key={item.id}>
                {item.quantity}
                <span>{item.name}</span>
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.orderSummarySection}>
        <div className={styles.orderName}>
          {`Toppings:`}
          <div className={styles.rupeesIcon}>
            <CurrencyRupeeOutlinedIcon />
            {calculateTotal(toppingsData)}
          </div>
        </div>
        <ul className={styles.orderItems}>
          {toppingsData
            .filter((item) => item.quantity)
            .map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
        </ul>
      </div>
      <div className={styles.totalItems}>
        {`Total : `}
        <CurrencyRupeeOutlinedIcon />
        {calculateGrandTotal()}
      </div>
      <div className={styles.checkTerms}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={agree}
          onChange={(e) => {
            setAgree(e.target.checked);
            if (e.target.checked) setError(false);
          }}
        ></input>
        <div>{`I agree to Terms and Conditions`}</div>
      </div>
      {error && (
        <div className={styles.error}>
          {`Please agree to the term and condition`}
        </div>
      )}
      <div className={styles.orderSundaeButton}>
        <button onClick={handleError} className={styles.confirmOrder}>
          {`Confirm Order`}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
