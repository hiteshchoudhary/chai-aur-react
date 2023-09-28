import React from "react";

const Button = ({
  children,
  type,
  bgColor,
  textColor,
  className,
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  bgColor: "bg-blue-600",
  textColor: "text-white",
  className: "",
};

export default Button;
