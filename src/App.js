import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./App.css";
import Home from "../src/components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import AnimatedRectangleWithStar from "./components/pages/Star";
import YoutubeVideo from "./components/pages/YoutubeVideo";
import Tracuu from "./components/pages/Tracuu";
function App() {
  return (
    <GoogleOAuthProvider clientId="658394130281-1m00f13gnk7go8e2hg3ccikkul94sl2g.apps.googleusercontent.com">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/star" element={<AnimatedRectangleWithStar />} />
          <Route path="/video" element={<YoutubeVideo />} />
          <Route path="/tracuu" element={<Tracuu />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
