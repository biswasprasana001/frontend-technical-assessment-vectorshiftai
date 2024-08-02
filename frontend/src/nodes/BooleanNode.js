// BooleanNode.js

import { AbstractNode } from "./AbstractNode";
import { Position } from "reactflow";

export const BooleanNode = ({ id, data }) => {
  const handles = [{ type: "source", position: Position.Right, id: "value" }];

  return <AbstractNode id={id} data={data} type="Boolean" handles={handles} />;
};
