import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "../src/components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
