import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({ children, isGoogle, inverted, ...otherProps }) => (
  <button
    className={` ${inverted ? "inverted" : ""}${
      isGoogle ? "google" : null
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
