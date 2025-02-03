import React from "react";
import PropTypes from "prop-types";
const variants = {
  primary:
    "border-blue_gray-300 border border-solid checked:border-blue_gray-300 checked:border-[3px] checked:border-solid checked:focus:border-blue_gray-300",
};
const sizes = {
  xs: "h-[20px] w-[20px] rounded-[10px]",
};
const Radio = React.forwardRef(
  (
    {
      className = "",
      name = "",
      label = "",
      id = "radio_id",
      variant = "primary",
      size = "xs",
      ...restProps
    },
    ref
  ) => {
    return (
      <label
        className={className + " flex items-center gap-[5px] cursor-pointer"}
      >
        <input
          className={` ${(size && sizes[size]) || ""} ${
            (variant && variants[variant]) || ""
          }`}
          ref={ref}
          type="radio"
          name={name}
          {...restProps}
          id={id}
        />
        <span>{label}</span>
      </label>
    );
  }
);
Radio.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.oneOf(["xs"]),
  variant: PropTypes.oneOf(["primary"]),
};
export { Radio };
