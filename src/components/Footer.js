import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

const footerLinks = [
  {
    title: "about",
    links: [
      {
        name: "Contact Us",
        redirect: "",
      },
      {
        name: "About Us",
        redirect: "",
      },
      {
        name: "Careers",
        redirect: "",
      },
      {
        name: "Roced Stories",
        redirect: "",
      },
      {
        name: "Press",
        redirect: "",
      },
      // {
      //   name: "Roced Wholesale",
      //   redirect: "",
      // },
      {
        name: "Corporate Information",
        redirect: "",
      },
    ],
  },
  {
    title: "help",
    links: [
      {
        name: "Payments",
        redirect: "",
      },
      {
        name: "Shipping",
        redirect: "",
      },
      {
        name: "Cancellation & Returns",
        redirect: "",
      },
      {
        name: "FAQ",
        redirect: "",
      },
    ],
  },
  {
    title: "policy",
    links: [
      {
        name: "Return Policy",
        redirect: "",
      },
      {
        name: "Terms Of Use",
        redirect: "",
      },
      {
        name: "Security",
        redirect: "",
      },
      {
        name: "Privacy",
        redirect: "",
      },
      {
        name: "Sitemap",
        redirect: "",
      },
      {
        name: "EPR Compliance",
        redirect: "",
      },
    ],
  },
  {
    title: "social",
    links: [
      {
        name: "Facebook",
        redirect: "",
      },
      {
        name: "Twitter",
        redirect: "",
      },
      {
        name: "YouTube",
        redirect: "",
      },
    ],
  },
];

const Footer = () => {
  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"));
  }, [location]);

  return (
    <div>
      {!adminRoute && (
        <div>
          <footer className="w-full py-1 sm:py-4 px-4 sm:px-12 bg-primary-darkBlue text-white text-xs border-b border-gray-600 flex flex-col sm:flex-row overflow-hidden">
            <div className="w-full sm:w-full sm:flex grid grid-cols-2 sm:flex-row justify-center">
              {footerLinks.map((el, i) => (
                <div
                  className="w-full sm:w-1/5 flex flex-col gap-2 my-3 sm:my-6 ml-10"
                  key={i}
                >
                  <h2 className="text-primary-grey mb-2 uppercase">
                    {el.title}
                  </h2>
                  {el.links.map((item, i) => (
                    <a
                      href={item.redirect}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                      key={i}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </footer>
          {/* <!-- footer ends --> */}
          <div className="px-16 py-6 w-full bg-primary-darkBlue sm:flex justify-center items-center sm:text-sm text-white">
            <span className="flex items-center justify-center sm:text-xl text-sm">
              Copyright by Phan Hoàng Phúc &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
