import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/home/Home";

// app
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
