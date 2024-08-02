// DateNode.js

import { AbstractNode } from "./AbstractNode";
import { Position } from "reactflow";

export const DateNode = ({ id, data }) => {
  const handles = [{ type: "source", position: Position.Right, id: "value" }];

  return <AbstractNode id={id} data={data} type="Date" handles={handles} />;
};
