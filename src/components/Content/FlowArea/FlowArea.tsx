import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import azureResources from '../../../utils/azureResources.json';
import NestingOptions from '../NestingOptions/NestingsOptions';
import { FlowContainer, NodeLabelContainer, NodeLabelIcon, NodeLabelText, NodeHeader } from './FlowArea.styles';

const FlowArea = ({
  initialNodes,
  initialEdges,
  selectedNodeId,
  setSelectedNodeId,
  selectedParentId,
  setSelectedParentId,
}: any) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges as any);

  const onConnect = useCallback(
    (connection: any) => {
      setEdges((eds: any) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const position = event.clientY - 170;
      const xPosition = event.clientX - 480;
      const id = (nodes.length + 1).toString();

      const resource = azureResources
        .flatMap((category: any) => category.resources)
        .find((r: any) => r.id === type);

      const isResourceGroup = resource?.label === 'Resource Group';

      const newNode: any = {
        id,
        type,
        position: {
          x: xPosition,
          y: position,
        },
        parentId: selectedParentId || null,
        extent: 'parent',
        data: {
          label: (
            <NodeLabelContainer>
              {isResourceGroup && (
                <>
                  <NodeLabelIcon
                    src="https://www.ssw.com.au/rules/static/97576d71a125f696f1f6d61b1e7efd24/6f3f2/icon-naming-azure_1710232021931.png"
                    alt="Resource Group"
                  />
                  <div>
                    <NodeHeader>RG</NodeHeader>
                    <NodeLabelText>{resource?.label}</NodeLabelText>
                  </div>
                </>
              )}
              {!isResourceGroup && <NodeLabelText>{resource?.label}</NodeLabelText>}
            </NodeLabelContainer>
          ),
        },
      };

      setNodes((nds: any) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleNodeClick = useCallback((node: any) => {
    setSelectedNodeId(node.id);
    setSelectedParentId(null);
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

  const onNodeDrag = useCallback(
    (node: any) => {
      const parentNode = nodes.find((n: any) => n.id === node.parentId);

      if (parentNode) {
        const parentStyle = parentNode.style || {};
        const parentWidth: any = parentStyle.width || 0;
        const parentHeight: any = parentStyle.height || 0;

        const nodeWidth = node.style?.width || 0;
        const nodeHeight = node.style?.height || 0;

        const newPosition = { ...node.position };

        newPosition.x = Math.max(
          0,
          Math.min(newPosition.x, parentWidth - nodeWidth)
        );
        newPosition.y = Math.max(
          0,
          Math.min(newPosition.y, parentHeight - nodeHeight)
        );

        setNodes((nds: any) =>
          nds.map((n: any) =>
            n.id === node.id ? { ...n, position: newPosition } : n
          )
        );
      }
    },
    [nodes, setNodes]
  );

  return (
    <FlowContainer>
      <ReactFlow
        nodes={nodes as any}
        edges={edges as any}
        onNodesChange={onNodesChange as any}
        onEdgesChange={onEdgesChange as any}
        onConnect={onConnect as any}
        onDrop={onDrop as any}
        onDragOver={onDragOver as any}
        onNodeClick={handleNodeClick as any}
        onNodeDrag={onNodeDrag as any}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <NestingOptions
        nodes={nodes}
        selectedNodeId={selectedNodeId}
        setSelectedNodeId={setSelectedNodeId}
        selectedParentId={selectedParentId}
        setSelectedParentId={setSelectedParentId}
        handleConfirm={handleConfirm}
      />
    </FlowContainer>
  );
};

export default FlowArea;
