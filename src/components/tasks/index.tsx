import { tasks } from "../../constant";
export interface ITasks {
  id: number;
  title: string;
  description: string;
}

const Tasks = () => {
  return (
    <div className="home-content container">
      {tasks.map((res) => {
        return (
          <div className="card">
            <div className="card-heading">
              <div>{res.id}</div>
              <div>{res.title}</div>
            </div>
            <div className="card-description">{res.description}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;
