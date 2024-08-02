// OutputNode.js

import { AbstractNode } from './AbstractNode';

import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'value' }
  ];

  return <AbstractNode id={id} data={data} type="Output" handles={handles} />;
};