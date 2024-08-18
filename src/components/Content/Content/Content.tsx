import { useState } from "react";
import { Container } from "./ContentStyles";
import ResourcesPanel from "../ResourcesPanel/ResourcesPanel";
import FlowArea from "../FlowArea/FlowArea";
import { initialEdges, initialNodes } from "../../../utils/InitialElements";

const CustomContent = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<any>(null);
  const [selectedParentId, setSelectedParentId] = useState<any>(null);

  return (
    <Container>
      <ResourcesPanel />
        <FlowArea
          initialNodes={initialNodes}
          initialEdges={initialEdges}
          selectedNodeId={selectedNodeId}
          setSelectedNodeId={setSelectedNodeId}
          selectedParentId={selectedParentId}
          setSelectedParentId={setSelectedParentId}
        />
    </Container>
  );
};

export default CustomContent;
