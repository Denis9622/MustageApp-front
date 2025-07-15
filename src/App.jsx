import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import TaskPage from "./pages/TaskPage/TaskPage";
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
import "./Loader.css";

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="loader-container">Loading...</div>}>
        <Routes>
          <Route path="/" element={<TaskPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
