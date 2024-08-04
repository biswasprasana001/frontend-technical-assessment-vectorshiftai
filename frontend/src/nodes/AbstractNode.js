// frontend\src\nodes\AbstractNode.js

import { useState, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";
import "./AbstractNode.css"; // Import the CSS file

export const AbstractNode = ({ id, data, type, handles, onChange }) => {
  const [name, setName] = useState(data?.name || id);
  const [nodeType, setNodeType] = useState(data?.nodeType || type);
  const [inputText, setInputText] = useState(data?.text || "");
  const [dynamicHandles, setDynamicHandles] = useState(handles);
  const [textareaHeight, setTextareaHeight] = useState("80px");

  const textareaRef = useRef(null);

  useEffect(() => {
    if (type === "Text") {
      const newHandles = extractVariables(inputText).map((variable) => ({
        type: "target",
        position: Position.Left,
        id: variable,
      }));

      setDynamicHandles((prevHandles) => {
        const combinedHandles = [...handles, ...newHandles];
        console.log(combinedHandles); // Log combined handles
        return combinedHandles;
      });
    }
  }, [inputText, type, handles]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputText]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
    }
  };

  const handleChange = (e, setState) => {
    setState(e.target.value);
    if (type === "Text" && setState === setInputText) {
      onChange(e.target.value);
    }
  };

  const extractVariables = (text) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\s*\}\}/g;
    const variables = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      variables.push(match[1]);
    }
    return variables;
  };

  return (
    <div
      className="node-container"
      style={
        type === "Text" ? { height: `calc(${textareaHeight} + 200px)` } : {}
      }
    >
      <div className="node-header">{type}</div>
      <div className="input-container">
        <label className="label">
          Name:
          <input
            type="text"
            className="input-field"
            value={name}
            onChange={(e) => handleChange(e, setName)}
          />
        </label>
        {type === "Input" || type === "Output" ? (
          <label className="label">
            Type:
            <select
              className="select-field"
              value={nodeType}
              onChange={(e) => handleChange(e, setNodeType)}
            >
              <option value="Text">Text</option>
              <option value="File">File</option>
            </select>
          </label>
        ) : type === "Text" ? (
          <label className="label">
            Text:
            <textarea
              ref={textareaRef}
              className="textarea-field"
              value={inputText}
              onChange={(e) => handleChange(e, setInputText)}
              style={{ height: textareaHeight }}
            />
          </label>
        ) : (
          <div>
            <span>This is a {type}.</span>
          </div>
        )}
      </div>
      {dynamicHandles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={{ ...handle.style, className: "handle" }} // Add className for handle
        />
      ))}
    </div>
  );
};
