import React from "react";
import PropTypes from "prop-types";
const shapes = {
  round: "rounded-[12px]",
};

const variants = {
  fill: {
    white_A700: "bg-white-A700 text-blue_gray-700_99",
    gray_50_01: "bg-gray-50_01",
  },
};

const sizes = {
  xs: "h-[43px] pl-4 pr-[35px] text-sm",
  sm: "h-[43px] pl-4 pr-[35px]",
  md: "h-[52px] pl-6 pr-[35px] text-sm",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      children,
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "fill",
      size = "md",
      color = "white_A700",
      ...restProps
    },
    ref
  ) => {
    const handleChange = (e) => {
      if (onChange) onChange(e?.target?.value);
    };

    return (
      <>
        <label
          className={`${className} flex justify-between cursor-text ${
            (shape && shapes[shape]) || ""
          } ${variants[variant]?.[color] || variants[variant] || ""} ${
            sizes[size] || ""
          }`}
        >
          {!!label && label}
          {!!prefix && prefix}
          <input
            ref={ref}
            type={type}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            {...restProps}
            className="flex-grow"
          />
          {!!suffix && suffix}
        </label>
      </>
    );
  }
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs", "sm", "md"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["white_A700", "gray_50_01"]),
};
export { Input };
