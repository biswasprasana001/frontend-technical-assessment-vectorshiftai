// NumberNode.js

import { AbstractNode } from "./AbstractNode";
import { Position } from "reactflow";

export const NumberNode = ({ id, data }) => {
  const handles = [{ type: "source", position: Position.Right, id: "value" }];

  return <AbstractNode id={id} data={data} type="Number" handles={handles} />;
};
