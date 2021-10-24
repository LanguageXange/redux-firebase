import React from "react";
import "./with-spinner.styles.scss";
const WithSpinner =
  (WrapComponent) =>
  ({ isLoading, ...otherprops }) => {
    return isLoading ? (
      <div className="spinner-overlay">
        <div className="spinner-container"></div>
      </div>
    ) : (
      <WrapComponent {...otherprops} />
    );
  };

export default WithSpinner;
