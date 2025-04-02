import styles from "./Greeting.module.scss";
import { useState } from "react";

interface IGreetComponentProps {
  name?: string | null;
}

const GreetingResult = ({ name = "Guest!" }: IGreetComponentProps) => {
  return (
    <div className={styles.greetingSection}>
      <div className={styles.name}>Hello {name}</div>
      <div className={styles.welcome}>Welcome to our application</div>
    </div>
  );
};

const Greeting = () => {
  const [name, setName] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  const onUpdate = () => {
    setName(inputValue);
    setInputValue("");
  };

  return (
    <div className={styles.greetingContent}>
      <div className={styles.greetingHead}>
        <div className={styles.heading}>Task 2. Greeting Component</div>
        <div className={styles.description}>
          Create a Greeting Component that takes a name as a prop and displays a
          personalized message.
        </div>
      </div>
      <GreetingResult name={name || undefined} />
      <div className={styles.updateSection}>
        <label className={styles.nameLabel}>Enter a name :</label>
        <div className={styles.inputSection}>
          <input
            className={styles.input}
            type="text"
            onChange={(e: any) => setInputValue(e.target.value)}
            name="name"
            value={inputValue}
            placeholder="Enter your name"
          ></input>
          <button
            onClick={onUpdate}
            disabled={!inputValue}
            className={`${styles.updateButton}  ${
              !inputValue ? styles.updateDisabledButton : ""
            }`}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
