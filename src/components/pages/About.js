import React, { useRef, useState } from "react";
import "./About.css";
import floor from "../../images/floor.jpg";
import floor3d from "../../images/floor3d.png";

const About = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const slider = sliderRef.current;
      const rect = slider.getBoundingClientRect();
      let offsetX;

      // Kiểm tra xem là sự kiện chuột hay cảm ứng
      if (e.clientX !== undefined) {
        offsetX = e.clientX - rect.left;
      } else if (e.touches && e.touches[0]) {
        offsetX = e.touches[0].clientX - rect.left;
      } else {
        return; // Nếu không có dữ liệu, thoát
      }

      // Đảm bảo vị trí không vượt quá kích thước slider
      const maxPosition = rect.width;
      offsetX = Math.max(0, Math.min(offsetX, maxPosition));
      slider.style.setProperty("--position", `${offsetX}px`);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="w-5/6 flex md:flex-row flex-col justify-between items-center">
        <div className="md:w-2/5 md:mb-0 mb-6 md:text-left text-center flex flex-col md:items-start items-center">
          <h1 className="text-xl md:text-2xl font-bold">
            Chuyển đổi bản vẽ mặt bằng của bạn thành một kế hoạch kỹ thuật số.
          </h1>
          <p className="md:text-base text-xs">
            Chuyển đổi một hình ảnh kế hoạch thành một dự án 3D hoàn toàn tùy
            chỉnh một cách mượt mà.
          </p>
          <button className="md:w-2/5 w-3/5 px-2 py-3 rounded-3xl text-white duration-1000 bg-gradient-to-r from-green-700 to-green-300   hover:shadow-gray-700 hover:shadow-2xl  hover:from-green-300 hover:to-green-700 ">
            Bắt đầu
          </button>
        </div>
        <div
          className="image-slider"
          ref={sliderRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleDragEnd}
        >
          <div
            className="image image-left"
            style={{ backgroundImage: `url(${floor})` }}
          ></div>
          <div
            className="image image-right"
            style={{ backgroundImage: `url(${floor3d})` }}
          ></div>
          <div
            className="slider-handle"
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            <button className="slider-button text-green-500 font-extrabold">{`< >`}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
