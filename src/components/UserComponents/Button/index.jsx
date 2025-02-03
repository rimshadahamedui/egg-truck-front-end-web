import React from "react";
import PropTypes from "prop-types";
const shapes = {
  round: "rounded-[26px]",
  square: "rounded-[0px]",
  circle: "rounded - [50%]",
};

const variants = {
  outline: {
    gray_200: "border-gray-200 border-l-[3px] border-solid text-blue_gray-700",
  },
  fill: {
    gray_900: "bg-gray-900 shadow-xs text-white-A700",
    white_A700: "bg-white-A700",
  },
};
const sizes = {
  lg: "h-[64px] px-[35px] text-base",
  md: "h-[52px] px-8 text-base",
  sm: "h-[36px] pl-3 text-sm",
  xs: "h-[36px] px-3.5",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "xs",
  color = "white_A700",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer disabled:opacity-50 ${
        (shape && shapes[shape]) || ""
      } ${(size && sizes[size]) || ""} ${
        (variant && variants[variant]?.[color]) || ""
      }`}
      {...restProps}
    >
      {!!leftIcon && leftIcon} {children}
      {!!rightIcon && rightIcon}{" "}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["round", "square", "circle"]),
  size: PropTypes.oneOf(["lg", "md", "sm", "xs"]),
  variant: PropTypes.oneOf(["outline", "fill"]),
  color: PropTypes.oneOf([
    "gray_200_7f",
    "light_blue_600",
    "white_A700",
    "gray_900",
    "gray_200",
  ]),
};
export { Button };
