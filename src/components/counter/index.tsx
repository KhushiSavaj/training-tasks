import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Counter.module.scss";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate();

  const decrement = () => {
    if (count === 0) return;
    setCount(count > 0 ? count - 1 : 0);
  };

  return (
    <div>
      <div onClick={() => navigate("/")} className={styles.backToTask}>
        <ArrowBackOutlinedIcon />
        <div className={styles.backButton}>Back To Task</div>
      </div>
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
    </div>
  );
};

export default Counter;
