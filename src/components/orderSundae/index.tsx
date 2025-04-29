import ProductListing from "./productListing";
import OrderSummary from "./orderSummary";
import ThankYouPage from "./thankYouPage";
import OrderSundaeProvider from "../../context/orderSundae";
import { useState } from "react";

const OrderSundae = () => {
  const [step, setStep] = useState<number>(1);

  const renderComponent = () => {
    switch (step) {
      case 1:
        return <ProductListing setStep={setStep} />;
      case 2:
        return <OrderSummary setStep={setStep} />;
      case 3:
        return <ThankYouPage setStep={setStep} />;
      default:
        return <div>{`Not available`}</div>;
    }
  };

  return (
    <OrderSundaeProvider>
      <div>{renderComponent()}</div>
    </OrderSundaeProvider>
  );
};

export default OrderSundae;
