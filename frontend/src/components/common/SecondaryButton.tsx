import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const SecondaryButton: React.FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={`w-full px-4 py-2 text-[#5b86e3] bg-white rounded-lg ring-1 ring-[#5b86e3]  hover:bg-gray-200  focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-75 ${
        className ? className : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
