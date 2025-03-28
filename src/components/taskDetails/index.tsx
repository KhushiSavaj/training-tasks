import { useParams } from "react-router-dom";
import Counter from "../counter";
import Greeting from "../greeting";

const TaskDetails = () => {
  const params = useParams();

  const renderComponent = () => {
    switch (Number(params.id)) {
      case 1:
        return <Counter />;
      case 2:
        return <Greeting />;
      default:
        return <div>{params.id}</div>;
    }
  };

  return <div>{renderComponent()}</div>;
};

export default TaskDetails;
