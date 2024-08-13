import React, { useCallback, useState, useEffect } from "react";
import { Layout, Select, Button } from "antd";
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  Panel,
  NodeToolbar,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import HeaderComp from "../Header/Header";
import TextUpdaterNode from "./TextUpdaterNode";

const { Content } = Layout;
const { Option } = Select;

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" }, type: 'textUpdater' },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];

const initialEdges = [
  { id: "1-2", source: "1", target: "2", label: "to there" },
];

const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

const CustomContent: React.FC = () => {
  const [variant, setVariant] = useState("cross");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeText, setNodeText] = useState("Option 1");

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onCreateNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: nodeText },
      type: 'textUpdater',
    };
    setNodes((nds) => [...nds, newNode]);
  };

  useEffect(() => {
    const centerNodes = () => {
      const reactFlowWrapper = document.querySelector('.react-flow') as HTMLElement;
      if (reactFlowWrapper) {
        const { width, height } = reactFlowWrapper.getBoundingClientRect();
        setNodes((nds) =>
          nds.map((node) => ({
            ...node,
            position: {
              x: width / 2 - 75,
              y: height / 2 - 50,
            },
            positionAbsolute: { x: width / 2 - 75, y: height / 2 - 50 },
          }))
        );
      }
    };

    centerNodes();
  }, []);

  return (
    <Content style={{ margin: 0, padding: 0, backgroundColor: "transparent" }}>
      <div style={{ width: "100%", height: "100%", padding: "24px" }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            className="react-flow"
          >
            <Controls />
            <MiniMap />
            {/* <Panel children={<HeaderComp />} position="top-center" /> */}
            <Panel position="top-right">
              <div>variant:</div>
              <button onClick={() => setVariant(BackgroundVariant.Dots)}>
                dots
              </button>
              <button onClick={() => setVariant(BackgroundVariant.Cross)}>
                cross
              </button>
              <button onClick={() => setVariant(BackgroundVariant.Lines)}>
                lines
              </button>
            </Panel>
            <Panel position="bottom-left">
              <Select
                defaultValue="Option 1"
                style={{ width: 120 }}
                onChange={(value) => setNodeText(value)}
              >
                <Option value="Option 1">Option 1</Option>
                <Option value="Option 2">Option 2</Option>
              </Select>
              <Button type="primary" onClick={onCreateNode} style={{ marginLeft: 10 }}>
                Create Node
              </Button>
            </Panel>
            <NodeToolbar />
            <Background variant={variant as BackgroundVariant} gap={12} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </Content>
  );
};

export default CustomContent;
