import styled from 'styled-components';

export const FlowContainer = styled.div`
  flex-grow: 1;
  position: relative;
`;

export const CustomNodeContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 3px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  padding: 10px;

  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

export const NodeIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  border-radius: 8px 0 0 8px;
  padding: 5px;
`;

export const NodeLabelIcon = styled.img`
  width: 30px;
  height: 30px;
`;

export const NodeContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;

export const NodeTypeText = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

export const NodeLabelText = styled.span`
  font-size: 12px;
  color: #555;
`;
