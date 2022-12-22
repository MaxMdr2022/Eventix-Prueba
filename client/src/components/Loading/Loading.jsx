import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

export default function Loading() {
  const rotate = keyframes`
    from {
      transform: rotate(0deg);
    }
  
    to {
      transform: rotate(360deg);
    }
  `;

  const Rotate = styled.div`
    width: 50px;
    height: 50px;
    border: 10px solid #f3f3f3; 
    border-top: 10px solid #383636; 
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;
  `;

  const RotDiv = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    height: 60vh;
  `;

  return (
    <RotDiv>
      <Rotate></Rotate>
    </RotDiv>
  );
}
