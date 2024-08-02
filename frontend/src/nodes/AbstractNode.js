// AbstractNode.js

import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const AbstractNode = ({ id, data, type, handles, onChange }) => {
  const [name, setName] = useState(data?.name || id);
  const [nodeType, setNodeType] = useState(data?.nodeType || type);
  const [inputText, setInputText] = useState(data?.text || '');
  const [dynamicHandles, setDynamicHandles] = useState(handles);

  useEffect(() => {
    if (type === 'Text') {
      const newHandles = extractVariables(inputText).map(variable => ({
        type: 'target',
        position: Position.Left,
        id: variable
      }));
      setDynamicHandles([...handles, ...newHandles]);
    }
  }, [inputText]);

  const handleChange = (e, setState) => {
    setState(e.target.value);
    if (type === 'Text' && setState === setInputText) {
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
    <div style={{ width: 'auto', minHeight: 80, border: '1px solid black', padding: 10 }}>
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
        {type === 'Input' || type === 'Output' ? (
          <label>
            Type:
            <select value={nodeType} onChange={(e) => handleChange(e, setNodeType)}>
              <option value="Text">Text</option>
              <option value="File">File</option>
            </select>
          </label>
        ) : type === 'Text' ? (
          <label>
            Text:
            <textarea 
              value={inputText} 
              onChange={(e) => handleChange(e, setInputText)}
              style={{ width: '100%', height: 'auto' }}
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
          style={handle.style}
        />
      ))}
    </div>
  );
};