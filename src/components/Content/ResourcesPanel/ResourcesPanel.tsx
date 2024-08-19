import { Collapse } from "antd";
import azureResources from "../../../utils/azureResources.json";
import {
  SidebarContainer,
  SidebarItem,
  SidebarItemIcon,
  SidebarItemLabel,
} from "../Content/ContentStyles";
import { DownOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const ResourcesPanel = () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const renderResources = (resources: any) => {
    return resources.map((resource: any) => (
      <>
        <SidebarItem
          key={resource.id}
          onDragStart={(event: any) => onDragStart(event, resource.id)}
          draggable
        >
          <SidebarItemIcon src={resource.logo} alt={`${resource.label} logo`} />
          <SidebarItemLabel>{resource.label}</SidebarItemLabel>
        </SidebarItem>
        {resource["sub-resources"] && (
          <div style={{ marginLeft: "16px" }}>
            {renderResources(resource["sub-resources"])}
          </div>
        )}
      </>
    ));
  };

  return (
    <SidebarContainer>
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <DownOutlined rotate={isActive ? 180 : 0} />
        )}
      >
        {azureResources.map((category: any, index: number) => (
          <Panel
            header={category.category}
            key={index}
            style={{ fontWeight: "bold" }}
          >
            {renderResources(category.resources)}
          </Panel>
        ))}
      </Collapse>
    </SidebarContainer>
  );
};

export default ResourcesPanel;
