import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  overflow-y: auto;
  background-color: #f0f2f5;
  padding: 16px;
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  background: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #e6f7ff;
  }
`;

export const SidebarItemIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

export const SidebarItemLabel = styled.span`
  font-size: 14px;
  color: #595959;
`;

export const ControlsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Select = styled.select`
  margin-left: 10px;
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #0078d4;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const Heading = styled.h3`
  margin-bottom: 10px;
`;
