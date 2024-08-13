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
import { initialNodes } from './InitialElements';
import azureResources from './azureResources.json'; // Import the JSON file

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2a-4a', source: '2a', target: '4a' },
  { id: 'e3-4b', source: '3', target: '4b' },
  { id: 'e4a-4b1', source: '4a', target: '4b1' },
  { id: 'e4a-4b2', source: '4a', target: '4b2' },
  { id: 'e4b1-4b2', source: '4b1', target: '4b2' },
];

const Sidebar = () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ padding: '10px', borderRight: '1px solid #ddd', width: '250px' }}>
      {azureResources.map((resource) => (
        <div
          key={resource.id}
          onDragStart={(event: any) => onDragStart(event, resource.id)}
          draggable
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            border: '1px solid #ddd',
            marginBottom: '10px',
            cursor: 'grab',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s',
          }}
          onMouseOver={(e: any) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseOut={(e: any) => e.currentTarget.style.transform = 'scale(1.0)'}
        >
          <img
            src={resource.logo}
            alt={`${resource.label} logo`}
            style={{ width: '24px', height: '24px', marginRight: '10px' }}
          />
          <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
            {resource.label}
          </span>
        </div>
      ))}
    </aside>
  );
};

const NestedFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: any) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = event.clientY - reactFlowBounds.top;
      const xPosition = event.clientX - reactFlowBounds.left;
      const id = (nodes.length + 1).toString();

      const newNode = {
        id,
        type,
        position: {
          x: xPosition,
          y: position,
        },
        data: { label: `${type.replace('-', ' ').toUpperCase()}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="react-flow-subflows-example"
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default NestedFlow;
