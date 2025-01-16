// src/components/Word.js
import React from 'react';
import styled from 'styled-components';

const WordListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 600px;
  margin: 20px auto;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 10px;
`;

const WordItem = styled.div`
  padding: 8px 15px;
  background-color: ${props => props.found ? '#4CAF50' : 'white'};
  color: ${props => props.found ? 'white' : 'black'};
  border-radius: 20px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
`;

const Word = ({ words, foundWords }) => {
  return (
    <WordListContainer>
      {words.map((word, index) => (
        <WordItem 
          key={index}
          found={foundWords.includes(word)}
        >
          {word}
        </WordItem>
      ))}
    </WordListContainer>
  );
};

export default Word;