// frontend/src/submit.js

import React from "react";
import { useReactFlow } from "reactflow";

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();

  const handleSubmit = async () => {
    const nodes = getNodes();
    const edges = getEdges();

    const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nodes, edges }),
    });

    const result = await response.json();
    alert(
      `Number of nodes: ${result.num_nodes}, Number of edges: ${result.num_edges}, Is DAG: ${result.is_dag}`
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
