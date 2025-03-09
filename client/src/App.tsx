import About from "./pages/About";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import Services from "./pages/Services";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
    </Routes>
  );
}

export default App;
