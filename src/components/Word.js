// src/components/Word.js
import React from 'react';
import styled from 'styled-components';

const WordItem = styled.div`
  padding: 8px 15px;
  background-color: ${props => props.found ? '#4CAF50' : 'white'};
  color: ${props => props.found ? 'white' : 'black'};
  border-radius: 20px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.9em;
  }
`;

const Word = ({ word, found }) => {
  return (
    <WordItem found={found}>
      {word}
    </WordItem>
  );
};

export default Word;