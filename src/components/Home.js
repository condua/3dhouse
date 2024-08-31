import React, { useState, useEffect } from "react";
import "../css/Home.css";
import bannerVideo from "../images/main-page-hero-laptop.mp4";
import kitchenRoom from "../images/img1.gif";
import bathRoom from "../images/bathroom1.gif";
import livingRoom from "../images/livingRoom1.gif";
import bedRoom from "../images/bedRoom.gif";
import About from "./pages/About";
import Contact from "./pages/Contact";
const Home = () => {
  const images = [kitchenRoom, bathRoom, livingRoom, bedRoom];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };
  useEffect(() => {
    // Chuyển đổi hình ảnh tự động sau mỗi 5 giây
    const interval = setInterval(nextImage, 7000);
    return () => clearInterval(interval); // Dọn dẹp interval khi component bị hủy
  }, []);
  return (
    <div className="Home-container bg-gray-100">
      <div className="banner-video">
        <div className="introduce-container">
          <h1>Create your dream house</h1>
          <p>An advanced and easy-to-use 2D/3D home design tool.</p>
          <button className="startButton">Start now</button>
        </div>
        <video autoPlay loop muted className="w-full">
          <source src={bannerVideo} type="video/mp4" />
        </video>
      </div>
      <div className="w-full flex flex-col items-center">
        <h1 className="font-mono md:text-3xl text-sm text-center my-5 mx-10">
          Tạo ra ngôi nhà ước mơ với những thiết kế 3d đỉnh cao
        </h1>
        <div className="w-11/12 flex md:flex-row flex-col justify-between items-center mb-5">
          {images.map((src, index) => (
            <div
              key={index}
              className="md:w-1/4 w-full flex flex-col justify-center items-center my-6"
            >
              <img
                className="md:w-64 md:h-64 w-52 h-52 rounded-full"
                alt={`Design ${index + 1}`}
                src={src}
              />
              <h2 className="md:text-3xl">Thiết kế sang trọng</h2>
            </div>
          ))}
        </div>
        <div className="mt-1 mb-5 flex flex-col justify-center items-center">
          <h1 className="font-serif md:text-3xl text-sm mb-10">
            Dễ dàng tạo ra những ngôi nhà của riêng bạn
          </h1>
          <div
            className="relative w-3/4 max-w-4xl
          "
          >
            <div className="absolute inset-y-0 md:-left-32 -left-14 flex items-center px-4">
              <button
                className="w-10 h-10 text-center md:bg-gray-800 md:text-white text-black rounded-full p-2 md:shadow-lg"
                onClick={prevImage}
              >
                &#9664;
              </button>
            </div>
            <div className="absolute inset-y-0 md:-right-32 -right-14 flex items-center px-4">
              <button
                className="w-10 h-10 text-center md:bg-gray-800 md:text-white text-black rounded-full p-2 md:shadow-lg"
                onClick={nextImage}
              >
                &#9654;
              </button>
            </div>
            <div className="overflow-hidden relative">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === index ? "bg-gray-600" : "bg-gray-800"
                  }`}
                  onClick={() => goToImage(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <About />
      <Contact />
    </div>
  );
};

export default Home;
