import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tasks from "./components/tasks";
import TaskDetails from "./components/taskDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/task/:id" element={<TaskDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
