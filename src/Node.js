import React from "react";

const Node = ({ name, level, tree, callback, onDobleClick, position }) => {
  console.log("node-name ->", name);
  return (
    <div
      className="node-container"
      onDoubleClick={() => onDobleClick(name)}
      onClick={() => callback(level, name, position)}
    >
      {name}
    </div>
  );
};

export default Node;
