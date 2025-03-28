import { useParams } from "react-router-dom";
import Counter from "../counter";

const TaskDetails = () => {
  const params = useParams();

  const renderComponent = () => {
    switch (Number(params.id)) {
      case 1:
        return <Counter />;
      case 2:
        return <div>Calculator</div>;
      default:
        return <div>{params.id}</div>;
    }
  };

  return <div>{renderComponent()}</div>;
};

export default TaskDetails;
