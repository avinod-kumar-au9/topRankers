import React from "react";

export default (props) => {
  const image = props.value === "Indonesia" ? "male.png" : "female.png";
  const imageSource = `https://www.ag-grid.com/example-assets/genders/${image}`;
  return (
    <span>
      <img src={imageSource} />
      {props.value}
    </span>
  );
};
