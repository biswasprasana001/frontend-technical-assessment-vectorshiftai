// TextNode.js

import { AbstractNode } from "./AbstractNode";
import { useState } from "react";
import { Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const handles = [{ type: "source", position: Position.Right, id: "output" }];

  const handleTextChange = (newText) => {
    setText(newText);
  };

  return (
    <AbstractNode
      id={id}
      data={{ ...data, text }}
      type="Text"
      handles={handles}
      onChange={handleTextChange}
    />
  );
};
