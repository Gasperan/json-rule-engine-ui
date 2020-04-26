import React from "react";

const Node = ({ name, callback, onDobleClick }) => {
  console.log("node-name ->", name);
  return (
    <div className="node-container" onDoubleClick={() => onDobleClick(name)}>
      <div className="node-title">{name}</div>
      <div className="node-button-section">
        <div onClick={() => callback(name)} className="add-condition">
          condition
        </div>
        <div onClick={() => onDobleClick(name)} className="add-bin-op">
          bin op
        </div>
      </div>
    </div>
  );
};

export default Node;
