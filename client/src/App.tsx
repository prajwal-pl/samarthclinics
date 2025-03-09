import About from "./pages/About";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
    </Routes>
  );
}

export default App;
