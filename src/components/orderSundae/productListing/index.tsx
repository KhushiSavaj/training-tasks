import { useContext, useState } from "react";
import {
  IOrderSundaeContext,
  orderSundaeContext,
} from "../../../context/orderSundae";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import styles from "./ProductListing.module.scss";

interface IProps {
  setStep: (step: number) => void; // use the state and return the function
  // scoopsQuantityHandler: () => void; // simple function not return value
}

const ProductListing = (props: IProps) => {
  const [error, setError] = useState<string | null>(null);
  const { setStep } = props;
  const {
    scoopsData,
    toppingsData,
    setScoopsData,
    setToppings,
    calculateTotal,
    calculateGrandTotal,
  } = useContext<IOrderSundaeContext>(orderSundaeContext);

  const scoopsQuantityHandler = (index: number, type: string) => {
    const scoopClone = [...scoopsData];
    if (type === "increment") {
      scoopClone[index].quantity += 1;
      setError(null);
    }
    if (type === "decrement") {
      scoopClone[index].quantity -= 1;
    }
    if (type === "delete") {
      scoopClone[index].quantity = 0;
    }
    setScoopsData(scoopClone);
  };

  const toppingQuantityHandler = (index: number, e: any) => {
    const updated = [...toppingsData];
    if (e.target.checked) {
      updated[index].quantity = 1;
      setError(null);
    } else {
      updated[index].quantity = 0;
    }
    setToppings(updated);
  };

  const handleOrderClick = () => {
    const hasScoops = scoopsData.some((item) => item.quantity > 0);
    const hasToppings = toppingsData.some((item) => item.quantity > 0);

    if (hasScoops || hasToppings) {
      setError(null);
      setStep(2);
    } else {
      setError(
        !hasScoops || !hasToppings ? "Please choose at least one Item" : ""
      );
    }
  };

  return (
    <div className={styles.productListing}>
      <div className={styles.sundaeHeading}>{`Design Your Sundae!`}</div>
      <div className={styles.productSection}>
        <div className={styles.productDescription}>
          <div className={styles.productHeading}>{`Scoops`}</div>
          <div className={styles.productTotal}>
            <div>{`Scoops Total :`}</div>
            <div className={styles.rupeesIcon}>
              <CurrencyRupeeOutlinedIcon />
              {calculateTotal(scoopsData)}
            </div>
          </div>
        </div>
        <div className={styles.productSectionData}>
          {scoopsData.map((res, index) => {
            return (
              <div key={res.id} className={styles.product}>
                <img src={res.image} className={styles.productImage}></img>
                <div className={styles.productDetails}>
                  <div className={styles.productName}>{res.name}</div>
                  <div className={styles.productPriceQuantity}>
                    <div className={styles.productPrice}>
                      <CurrencyRupeeOutlinedIcon />
                      {res.price}
                    </div>
                    <div className={styles.productQuantity}>
                      {res.quantity > 0 && (
                        <>
                          {res.quantity > 1 ? (
                            <RemoveOutlinedIcon
                              onClick={() =>
                                scoopsQuantityHandler(index, "decrement")
                              }
                            />
                          ) : (
                            <DeleteOutlinedIcon
                              onClick={() =>
                                scoopsQuantityHandler(index, "delete")
                              }
                            />
                          )}
                          <div className={styles.quantity}>{res.quantity}</div>
                        </>
                      )}
                      <AddOutlinedIcon
                        onClick={() =>
                          scoopsQuantityHandler(index, "increment")
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.productSection}>
        <div className={styles.productDescription}>
          <div className={styles.productHeading}>{`Toppings`}</div>
          <div className={styles.productTotal}>
            <div>{`Toppings Total :`}</div>
            <div className={styles.rupeesIcon}>
              <CurrencyRupeeOutlinedIcon />
              {calculateTotal(toppingsData)}
            </div>
          </div>
        </div>
        <div className={styles.productSectionData}>
          {toppingsData.map((val, index) => {
            return (
              <div key={val.id} className={styles.product}>
                <img src={val.image} className={styles.productImage}></img>
                <div className={styles.productDetails}>
                  <div className={styles.productCheckName}>
                    <input
                      type="checkbox"
                      checked={val.quantity > 0}
                      onChange={(e) => {
                        toppingQuantityHandler(index, e);
                      }}
                      className={styles.checkIcon}
                    ></input>
                    <div className={styles.productName}>{val.name}</div>
                  </div>
                  <div className={styles.productPrice}>
                    <div className={styles.productPrice}>
                      <CurrencyRupeeOutlinedIcon />
                      {val.price}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.grandTotal}>
        {`Grand total : `}
        <CurrencyRupeeOutlinedIcon />
        {calculateGrandTotal()}
      </div>
      <div className={styles.orderSundaeButton}>
        {error && <div className={styles.error}>{error}</div>}
        <button onClick={handleOrderClick} className={styles.sundaeButton}>
          {`Order Sundae!`}
        </button>
      </div>
    </div>
  );
};

export default ProductListing;
