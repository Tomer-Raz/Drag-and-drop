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
import {
  FlowContainer,
  CustomNodeContainer,
  NodeIconContainer,
  NodeLabelIcon,
  NodeContent,
  NodeTypeText,
  NodeLabelText,
} from './FlowArea.styles';

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

      const newNode: any = {
        id,
        type,
        position: {
          x: xPosition,
          y: position,
        },
        parentId: selectedParentId || null,
        extent: 'parent',
        text: resource?.label,
        data: {
          label: (
            <CustomNodeContainer>
              <NodeIconContainer>
                <NodeLabelIcon
                  src={resource?.logo}
                  alt={`${resource?.label} logo`}
                />
              </NodeIconContainer>
              <NodeContent>
                <NodeTypeText>{resource?.label}</NodeTypeText>
                <NodeLabelText>{resource?.label}</NodeLabelText>
              </NodeContent>
            </CustomNodeContainer>
          ),
        },
        style: {
          width: 'auto',
          backgroundColor: 'transparent',
          border: 'none',
          padding: '0',
        },
      };

      setNodes((nds: any) => nds.concat(newNode));
    },
    [nodes, setNodes, selectedParentId]
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

  const onNodeDragStop = useCallback(
    (event: any, node: any) => {
      const draggedNode = nodes.find((n: any) => n.id === node.id);
      const parentNode = nodes.find(
        (n: any) =>
          n.id !== node.id &&
          n.type === 'group' &&
          n.position.x <= node.position.x &&
          n.position.y <= node.position.y &&
          n.position.x + (n.style?.width || 0) >= node.position.x &&
          n.position.y + (n.style?.height || 0) >= node.position.y
      );

      if (parentNode) {
        setNodes((nds: any) =>
          nds.map((n: any) =>
            n.id === draggedNode?.id ? { ...n, parentId: parentNode.id } : n
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
        onNodeDragStop={onNodeDragStop as any}
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
