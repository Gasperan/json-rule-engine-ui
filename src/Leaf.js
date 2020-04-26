import React from "react";

const Leaf = ({ fact, operator, value }) => {
  return (
    <div className="leaf-container">
      <div>
        {fact}
        <br />
        {operator}
        <br />
        {value}
      </div>
    </div>
  );
};

export default Leaf;
