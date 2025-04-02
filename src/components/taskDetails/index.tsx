import { useNavigate, useParams } from "react-router-dom";
import Counter from "../counter";
import Greeting from "../greeting";
import FormHandling from "../formHandling";
import TodoList from "../todoList";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import styles from "./TaskDetails.module.scss";

const TaskDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (Number(params.id)) {
      case 1:
        return <Counter />;
      case 2:
        return <Greeting />;
      case 3:
        return <FormHandling />;
      case 4:
        return <TodoList />;
      default:
        return <div>{params.id}</div>;
    }
  };

  return (
    <div>
      <div onClick={() => navigate("/")} className={styles.backToTask}>
        <ArrowBackOutlinedIcon />
        <div className={styles.backButton}>Back To Task</div>
      </div>
      {renderComponent()}
    </div>
  );
};

export default TaskDetails;
