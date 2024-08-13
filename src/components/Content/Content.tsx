import { useState, useCallback } from "react";
import {
  ReactFlow,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { initialNodes } from "./InitialElements";
import azureResources from "./azureResources.json";

const initialEdges: any = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2a-4a", source: "2a", target: "4a" },
  { id: "e3-4b", source: "3", target: "4b" },
  { id: "e4a-4b1", source: "4a", target: "4b1" },
  { id: "e4a-4b2", source: "4a", target: "4b2" },
  { id: "e4b1-4b2", source: "4b1", target: "4b2" },
];

const Sidebar = () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside
      style={{ padding: "10px", borderRight: "1px solid #ddd", width: "250px" }}
    >
      {azureResources.map((resource: any) => (
        <div
          key={resource.id}
          onDragStart={(event: any) => onDragStart(event, resource.id)}
          draggable
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            border: "1px solid #ddd",
            marginBottom: "10px",
            cursor: "grab",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e: any) =>
            (e.currentTarget.style.transform = "scale(1.02)")
          }
          onMouseOut={(e: any) =>
            (e.currentTarget.style.transform = "scale(1.0)")
          }
        >
          <img
            src={resource.logo}
            alt={`${resource.label} logo`}
            style={{ width: "24px", height: "24px", marginRight: "10px" }}
          />
          <span style={{ fontSize: "16px", fontWeight: "500", color: "#333" }}>
            {resource.label}
          </span>
        </div>
      ))}
    </aside>
  );
};

const NestedFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges as any);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);

  const onConnect = useCallback(
    (connection: any) => {
      setEdges((eds: any) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      const position = event.clientY - reactFlowBounds.top;
      const xPosition = event.clientX - reactFlowBounds.left;
      const id = (nodes.length + 1).toString();

      const resource = azureResources.find((r: any) => r.id === type);

      const newNode: any = {
        id,
        type,
        position: {
          x: xPosition,
          y: position,
        },
        data: {
          label: (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={resource?.logo}
                alt={`${resource?.label} logo`}
                style={{ width: "24px", height: "24px", marginRight: "10px" }}
              />
              <span>{resource?.label}</span>
            </div>
          ),
        },
      };

      setNodes((nds: any) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleNodeClick = useCallback((event: any, node: any) => {
    setSelectedNodeId(node.id);
    setSelectedParentId(null); // Reset parent ID when a new node is selected
  }, []);

  const handleConfirm = () => {
    if (selectedNodeId && selectedParentId) {
      setNodes((nds: any) =>
        nds.map((n: any) =>
          n.id === selectedNodeId ? { ...n, parentId: selectedParentId } : n
        )
      );
      setSelectedNodeId(null);
      setSelectedParentId(null);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, position: "relative" }}>
        <ReactFlow
          nodes={nodes as any}
          edges={edges as any}
          onNodesChange={onNodesChange as any}
          onEdgesChange={onEdgesChange as any}
          onConnect={onConnect as any}
          onDrop={onDrop as any}
          onDragOver={onDragOver as any}
          onNodeClick={handleNodeClick as any}
          className="react-flow-subflows-example"
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>Nesting Options</h3>
          <div>
            <label>
              Node:
              <select
                value={selectedNodeId || ""}
                onChange={(e) => setSelectedNodeId(e.target.value)}
                style={{ marginLeft: "10px" }}
              >
                <option value="" disabled>
                  Select Node
                </option>
                {nodes.map((node: any) => (
                  <option key={node.id} value={node.id}>
                    {/* Safely accessing the label's children */}
                    {node.data.label?.props?.children
                      ? node.data.label.props.children[1]
                      : node.id}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div style={{ marginTop: "10px" }}>
            <label>
              Parent:
              <select
                value={selectedParentId || ""}
                onChange={(e) => setSelectedParentId(e.target.value)}
                style={{ marginLeft: "10px" }}
              >
                <option value="" disabled>
                  Select Parent
                </option>
                {nodes
                  .filter(
                    (node: any) =>
                      nodes.some((n: any) => n.parentId === node.id) ||
                      node.type === "group"
                  )
                  .map((node: any) => (
                    <option key={node.id} value={node.id}>
                      {node.data.label?.props?.children
                        ? node.data.label.props.children[1]
                        : node.id}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          <button
            onClick={handleConfirm}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#0078d4",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default NestedFlow;
