import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tasks from "./components/tasks";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
