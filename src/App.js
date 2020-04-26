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
    insertGeneric(nodeName, {
      fact: "tipotarjeta",
      operator: "equal",
      value: "CMR",
    });
  };

  const insertLeaf = (nodeName) => {
    insertGeneric(nodeName, {
      all: [],
    });
  };

  const insertGeneric = (nodeName, node) => {
    const currentChilds = _.get(tree[0], nodeName);
    currentChilds.push(node);
    const newStructure = _.set(tree[0], nodeName, currentChilds);
    setTree([newStructure]);
  };

  const renderChilds = (tree, path) => {
    return (
      <div style={{ marginLeft: 50 }}>
        {tree.map((node, index) => {
          const { fact, operator, value } = node;
          if (fact) {
            return (
              <Leaf
                key={index + new Date().getTime()}
                fact={fact}
                operator={operator}
                value={value}
              />
            );
          } else {
            const nodeName = Object.keys(node)[0];
            let newPath = path + "[" + index + "]." + nodeName;

            if (newPath.startsWith("[")) {
              newPath = newPath.substring(4, newPath.length);
            }
            return (
              <div key={index + new Date().getTime()}>
                <Node
                  key={"node" + index + new Date().getTime()}
                  path={newPath}
                  callback={insertNode}
                  onDobleClick={insertLeaf}
                />
                {renderChilds(node[nodeName], newPath)}
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
