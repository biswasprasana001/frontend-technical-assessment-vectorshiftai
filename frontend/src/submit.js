// frontend/src/submit.js

import React, { useState } from "react";
import { useReactFlow } from "reactflow";

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();
  const [alert, setAlert] = useState(false);
  const [res, setRes] = useState({});

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
    // alert(
    //   `Number of nodes: ${result.num_nodes}, Number of edges: ${result.num_edges}, Is DAG: ${result.is_dag}`
    // );
    setAlert(true);
    setRes(result);
    console.log(result);
    console.log(res);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        // className="button-container"
      >
        <button type="button" onClick={handleSubmit} className="button">
          Submit
        </button>
      </div>
      {alert && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          className='alert-container'
        >
          <p>Number of nodes: {res.num_nodes}</p>
          <p>Number of edges: {res.num_edges}</p>
          <p>Is DAG ?: {res.is_dag ? "Yes" : "No"}</p>
        </div>
      )}
    </>
  );
};
