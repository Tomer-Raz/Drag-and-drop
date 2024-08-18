import { Collapse } from 'antd';
import azureResources from '../../../utils/azureResources.json';
import { SidebarContainer, SidebarItem, SidebarItemIcon, SidebarItemLabel } from '../Content/ContentStyles';
import { DownOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const ResourcesPanel = () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <SidebarContainer>
      <Collapse
        bordered={false}
        defaultActiveKey={['0']}
        expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}
      >
        {azureResources.map((category: any, index: number) => (
          <Panel header={category.category} key={index} style={{ fontWeight: 'bold' }}>
            {category.resources.map((resource: any) => (
              <SidebarItem
                key={resource.id}
                onDragStart={(event: any) => onDragStart(event, resource.id)}
                draggable
              >
                <SidebarItemIcon src={resource.logo} alt={`${resource.label} logo`} />
                <SidebarItemLabel>{resource.label}</SidebarItemLabel>
              </SidebarItem>
            ))}
          </Panel>
        ))}
      </Collapse>
    </SidebarContainer>
  );
};

export default ResourcesPanel;
