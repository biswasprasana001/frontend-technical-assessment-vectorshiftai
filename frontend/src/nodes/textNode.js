import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeSize, setNodeSize] = useState({ width: 200, height: 80 });
  const [handles, setHandles] = useState([]);

  useEffect(() => {
    // Adjust node size based on text length
    const lines = currText.split('\n');
    const newHeight = Math.max(80, lines.length * 20); // 20px per line
    const newWidth = Math.max(200, ...lines.map(line => line.length * 8)); // 8px per character
    setNodeSize({ width: newWidth, height: newHeight });

    // Create handles for variables within double curly brackets
    const newHandles = [];
    const regex = /{{\s*(\w+)\s*}}/g;
    let match;
    while ((match = regex.exec(currText)) !== null) {
      const variableName = match[1];
      if (!newHandles.some(handle => handle.id === `${id}-${variableName}`)) {
        newHandles.push({ type: 'target', position: Position.Left, id: `${id}-${variableName}`, label: variableName });
      }
    }
    setHandles(newHandles);
  }, [currText, id]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div style={{ width: nodeSize.width, height: nodeSize.height, border: '1px solid black', padding: 10 }}>
      <div>
        <span>Text</span>
      </div>
      <div>
        <label>
          Text:
          <input 
            type="text" 
            value={currText} 
            onChange={handleTextChange} 
            style={{ width: '100%' }}
          />
        </label>
      </div>
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{ top: `${(index + 1) * 30}px` }}
        />
      ))}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: `${nodeSize.height / 2}px` }}
      />
    </div>
  );
};
