import React from 'react';
import styled from 'styled-components';

export const CarComponent = ({ position = 0, isBraking = false }) => {
  return <StyledCar isBraking={isBraking} position={position} />;
}

const StyledCar = styled.div<{ isBraking: boolean, position: number }>`
  transform: translateY(${({ position }) => -position}px);
  width: 32px;
  height: 64px;
  background-color: darkolivegreen;
  border-radius: 8px;
  
  border-bottom: ${({isBraking}) => isBraking ? 'red' : 'transparent'} solid 4px;
`;