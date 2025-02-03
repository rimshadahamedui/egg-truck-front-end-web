import React from "react";
const sizes = {
  xl: "text-[64px] font-semibold md:text-5xl",
  s: "text-lg font-semibold",
  md: "text-2xl font-semibold md:text-[22px]",
  xs: "text-base font-semibold",
  lg: "text-4xl font-semibold md:text-[34px] sm:text-[32px]",
  mdx: "text-3xl font-semibold md:text-[22px]",
};

const Heading = ({ children, className, size = "xs", as, ...restProps }) => {
  const Component = as || "h6";
  return (
    <Component
      className={`text-gray-900 font-poppins ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};
export { Heading };
