// AbstractNode.js

import { useState } from "react";
import { Handle } from "reactflow";

export const AbstractNode = ({ id, data, type, handles }) => {
  const [name, setName] = useState(data?.name || id);
  const [nodeType, setNodeType] = useState(data?.nodeType || type);

  const handleChange = (e, setState) => {
    setState(e.target.value);
  };

  return (
    <div style={{ width: 200, height: 80, border: "1px solid black" }}>
      <div>
        <span>{type}</span>
      </div>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => handleChange(e, setName)}
          />
        </label>
        {type === "Input" || type === "Output" ? (
          <label>
            Type:
            <select
              value={nodeType}
              onChange={(e) => handleChange(e, setNodeType)}
            >
              <option value="Text">Text</option>
              <option value="File">File</option>
            </select>
          </label>
        ) : type === "Text" ? (
          <label>
            Text:
            <input
              type="text"
              value={nodeType}
              onChange={(e) => handleChange(e, setNodeType)}
            />
          </label>
        ) : (
          <div>
            <span>This is a {type}.</span>
          </div>
        )}
      </div>
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}
    </div>
  );
};
