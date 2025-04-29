import { Link } from "react-router-dom";
import { tasks } from "../../constant";
import styles from "./Tasks.module.scss";

export interface ITasks {
  id: number;
  title: string;
  description: string;
}

const Tasks = () => {
  return (
    <div>
      <div className={styles.tasksHeading}>{`React Training Tasks`}</div>
      <div className={styles.homeContent}>
        {tasks.map((res) => {
          return (
            <Link
              key={res.id}
              to={`/task/${res?.id}`}
              className={styles.cardContent}
            >
              <div className={styles.card}>
                <div className={styles.cardHeading}>
                  <div>{res.id}</div>
                  <div>{res.title}</div>
                </div>
                <div className={styles.cardDescription}>{res.description}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
