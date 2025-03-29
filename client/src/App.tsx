import About from "./pages/About";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Signup from "./pages/sign-up";
import Signin from "./pages/sign-in";
import Role from "./pages/Role";
import Appointments from "./pages/Appointments";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/role" element={<Role />} />
      <Route path="/appointments" element={<Appointments />} />
    </Routes>
  );
}

export default App;
