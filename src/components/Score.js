// src/components/Score.js
import React from 'react';
import styled from 'styled-components';

const ScoreContainer = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #4CAF50;
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Score = ({ score }) => {
  return (
    <ScoreContainer>
      Score: {score}
    </ScoreContainer>
  );
};

export default Score;