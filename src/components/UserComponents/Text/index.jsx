import React from "react";
const sizes = {
  xs: "text-xs font-medium",
  lg: "text-xl font-medium",
  s: "text-sm font-normal",
  md: "text-base font-normal",
};

const Text = ({ children, className = "", as, size = "md", ...restProps }) => {
  const Component = as || "p";
  return (
    <Component
      className={`text-blue_gray-700 font-poppins ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};
export { Text };
