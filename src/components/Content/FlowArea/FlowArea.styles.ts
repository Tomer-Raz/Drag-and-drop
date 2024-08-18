import styled from 'styled-components';

export const FlowContainer = styled.div`
  flex-grow: 1;
  position: relative;
`;

export const NodeLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NodeLabelIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export const NodeLabelText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

export const NodeHeader = styled.div`
  background-color: #0078d4;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 5px;
  font-size: 12px;
  text-align: center;
`;
