import {
  ControlsContainer,
  Select,
  Button,
  Heading,
} from '../Content/ContentStyles';

const NestingOptions = ({
  nodes,
  selectedNodeId,
  setSelectedNodeId,
  selectedParentId,
  setSelectedParentId,
  handleConfirm,
}: any) => {
  return (
    <ControlsContainer>
      <Heading>Nesting Options</Heading>
      <div>
        <label>
          Node:
          <Select
            value={selectedNodeId || ''}
            onChange={(e) => setSelectedNodeId(e.target.value)}
          >
            <option value='' disabled>
              Select Node
            </option>
            {nodes.map((node: any) => (
              <option key={node.id} value={node.id}>
                {node.data.label?.props?.children
                  ? node.data.label.props.children[1]
                  : node.data.label}
              </option>
            ))}
          </Select>
        </label>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>
          Parent:
          <Select
            value={selectedParentId || ''}
            onChange={(e) => setSelectedParentId(e.target.value)}
          >
            <option value='' disabled>
              Select Parent
            </option>
            {nodes
              .filter(
                (node: any) =>
                  nodes.some((n: any) => n.parentId === node.id) ||
                  node.type === 'group'
              )
              .map((node: any) => (
                <option key={node.id} value={node.id}>
                  {node.data.label?.props?.children
                    ? node.data.label.props.children[1]
                    : node.data.label}
                </option>
              ))}
          </Select>
        </label>
      </div>
      <Button onClick={handleConfirm}>Confirm</Button>
    </ControlsContainer>
  );
};

export default NestingOptions;
