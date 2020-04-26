import React from "react";

const Node = ({ path, callback, onDobleClick }) => {
  console.log("node-path ->", path);
  return (
    <div className="node-container" onDoubleClick={() => onDobleClick(path)}>
      <div className="node-title">{path}</div>
      <div className="node-button-section">
        <div onClick={() => callback(path)} className="add-condition">
          condition
        </div>
        <div onClick={() => onDobleClick(path)} className="add-bin-op">
          bin op
        </div>
      </div>
    </div>
  );
};

export default Node;
