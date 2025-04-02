import { useState } from "react";
import styles from "./Counter.module.scss";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  const decrement = () => {
    if (count === 0) return;
    setCount(count > 0 ? count - 1 : 0);
  };

  return (
    <div className={styles.counterContent}>
      <div className={styles.counterHead}>
        <div className={styles.counterHeading}>1. Counter App</div>
        <div className={styles.counterDescription}>
          Create a simple counter with Increment, Decrement, and Reset button
          using useState.
        </div>
      </div>
      <div className={styles.counterSection}>
        <div className={styles.count}>{count}</div>
        <div className={styles.currentCount}>Current Count</div>
        <div className={styles.countButton}>
          <RemoveOutlinedIcon
            onClick={decrement}
            className={count === 0 ? styles.disabled : ""}
          />
          <ReplayOutlinedIcon onClick={() => setCount(0)} />
          <AddOutlinedIcon onClick={() => setCount(count + 1)} />
        </div>
      </div>
    </div>
  );
};

export default Counter;
