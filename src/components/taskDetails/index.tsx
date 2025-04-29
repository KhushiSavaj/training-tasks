import { useNavigate, useParams } from "react-router-dom";
import Counter from "../counter";
import Greeting from "../greeting";
import FormHandling from "../formHandling";
import TodoList from "../todoList";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import styles from "./TaskDetails.module.scss";
import { useEffect, useState } from "react";
import { tasks } from "../../constant";
import OrderSundae from "../orderSundae";

const TaskDetails = () => {
  const [currentTaskDetails, setCurrentTaskDetails] = useState<any>({});
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const fetchTaskDetails = (id: string) => {
    const findTaskDetails = tasks.find((ele) => ele.id === Number(id));
    setCurrentTaskDetails(findTaskDetails);
  };

  useEffect(() => {
    if (id) {
      fetchTaskDetails(id);
    }
  });

  const renderComponent = () => {
    switch (Number(params.id)) {
      case 1:
        return <Counter task={currentTaskDetails} />;
      case 2:
        return <Greeting task={currentTaskDetails} />;
      case 3:
        return <FormHandling task={currentTaskDetails} />;
      case 4:
        return <TodoList task={currentTaskDetails} />;
      case 5:
        return <OrderSundae />;
      default:
        return <div>{params.id}</div>;
    }
  };

  return (
    <div>
      <div onClick={() => navigate("/")} className={styles.backToTask}>
        <ArrowBackOutlinedIcon />
        <div className={styles.backButton}>{`Back To Task`}</div>
      </div>
      {renderComponent()}
    </div>
  );
};

export default TaskDetails;
