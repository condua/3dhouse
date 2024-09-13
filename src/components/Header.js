import React, { useState } from "react";
import "../css/Home.css";
import logoBk from "../images/logoBK.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full" style={{ height: "60px" }}>
      <div className="navbar flex items-center justify-between px-6 py-4 bg-gray-800">
        <img alt="" className="logo" src={logoBk} />
        <div className="menu-icon" onClick={toggleMenu}>
          <div
            className={isOpen ? "menu-icon__line open" : "menu-icon__line"}
          ></div>
          <div
            className={isOpen ? "menu-icon__line open" : "menu-icon__line"}
          ></div>
          <div
            className={isOpen ? "menu-icon__line open" : "menu-icon__line"}
          ></div>
        </div>
        <ul
          className={
            isOpen
              ? "nav-links open flex space-x-6"
              : "nav-links flex space-x-6"
          }
        >
          <li>
            <a
              className="md:ml-0 ml-6 hover:text-gray-400 duration-700"
              href="/"
            >
              Trang chủ
            </a>
          </li>
          <li>
            <a className="hover:text-gray-400 duration-700" href="/about">
              Giới thiệu
            </a>
          </li>
          <li className="relative">
            <a
              href="#home"
              className="inline-block hover:text-gray-400 duration-700"
            >
              Dịch vụ ▼
            </a>
            <ul className="dropdown-content">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <a href="#item1">Phòng khách</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <a href="#item2">Nhà bếp</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <a href="#item3">Phòng ngủ</a>
              </li>
            </ul>
          </li>
          <li>
            <a className="hover:text-gray-400 duration-700" href="/blog">
              Blog
            </a>
          </li>
          <li>
            <a className="hover:text-gray-400 duration-700" href="/contact">
              Liên hệ
            </a>
          </li>
          <li>
            <a className="hover:text-gray-400 duration-700" href="/tracuu">
              Tra cứu
            </a>
          </li>
          <li>
            <a className="hover:text-gray-400 duration-700" href="/star">
              Ngôi sao
            </a>
          </li>
          <li className="px-1 py-2 bg-green-700 rounded-md hover:bg-green-500 duration-700">
            <a style={{ color: "white" }} href="/login">
              Login
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
