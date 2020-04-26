import React, { useState } from "react";
import Node from "./Node";
import Leaf from "./Leaf";
import "./App.css";
import JSONPretty from "react-json-prettify";
import { gruvboxDark } from "react-json-prettify/dist/themes";
import _ from "lodash";
import copy from "copy-to-clipboard";

const basic = {
  all: [],
};

function App() {
  const [tree, setTree] = useState([basic]);

  const insertNode = (nodeName) => {
    const leaf = {
      fact: "tipotarjeta",
      operator: "equal",
      value: "CMR",
    };

    const currentChilds = _.get(tree[0], nodeName);
    currentChilds.push(leaf);
    const newStructure = _.set(tree[0], nodeName, currentChilds);
    setTree([newStructure]);
  };

  const insertLeaf = (nodeName) => {
    const all = {
      all: [],
    };
    const currentChilds = _.get(tree[0], nodeName);
    currentChilds.push(all);
    const newStructure = _.set(tree[0], nodeName, currentChilds);
    setTree([newStructure]);
  };

  const renderChilds = (tree, level) => {
    return (
      <div style={{ marginLeft: 50 }}>
        {tree.map((node, index) => {
          const { fact, operator, value } = node;
          if (fact) {
            return (
              <Leaf key={index} fact={fact} operator={operator} value={value} />
            );
          } else {
            const nodeName = Object.keys(node);
            let newName = level + "[" + index + "]." + nodeName[0];

            if (newName.startsWith("[")) {
              newName = newName.substring(4, newName.length);
            }
            return (
              <div>
                <Node
                  key={index}
                  name={newName}
                  position={index}
                  callback={insertNode}
                  onDobleClick={insertLeaf}
                />
                {renderChilds(node[nodeName], newName)}
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="rules-container">{renderChilds(tree, "")}</div>
      <div className="rules-json-container">
        <JSONPretty
          className="json-pretty"
          json={tree[0]}
          padding={5}
          theme={gruvboxDark}
        />
        <button
          onClick={() => copy(JSON.stringify(tree[0]))}
          className="button"
        >
          copy
        </button>
      </div>
    </div>
  );
}

export default App;
