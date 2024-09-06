import React from "react";
import { useNavigate } from "react-router-dom";

const navigationMenu = [
  {
    name: "Support center",
    href: "#",
  },
  {
    name: "Invoicing",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
  {
    name: "Careers",
    href: "#",
  },
  {
    name: "Blog",
    href: "#",
  },
  {
    name: "FAQs",
    href: "#",
  },
];

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer id="footer" className="p-6 sm:py-16 px-8 text-[#484848] w-full">
      <div className="md:flex items-center md:justify-between lg:gap-60 md:gap-14">
        <div className="mb-6 md:mb-0">
          <span
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/");
            }}
            className="flex -mt-6 flex-col items-center cursor-pointer"
          >
            <h2 className="text-3xl volkhov-regular">FASCO</h2>
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-6">
          {navigationMenu.map((item, index) => {
            return (
              <div key={index} className="text-sm text-center">
                <a href={item.href} className="hover:underline">
                  {item.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center mt-6">
        <span className="text-sm sm:text-center">
          © 2023{" "}
          <a href="#" className="hover:underline">
            Xpro
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
