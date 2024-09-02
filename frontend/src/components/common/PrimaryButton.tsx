import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const PrimaryButton = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={`w-full poppins-regular px-6 py-2 text-[16px] transition-all duration-200 text-white bg-black rounded-lg shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 ${
        className ? className : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
