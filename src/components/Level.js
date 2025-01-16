// src/components/Level.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from './Grid';
import Word from './Word';
import Timer from './Timer';
import Score from './Score';
import { generateWordSearchGrid } from '../utils/wordGenerator';
import { calculateScore, isLevelComplete } from '../utils/gameLogic';
import { saveGameProgress, saveHighScore } from '../utils/storage';

const LevelContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const LevelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin-bottom: 10px;
    gap: 5px;

    h2 {
      font-size: 1.5rem;
    }
  }
`;

const WordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 5px;
    margin-bottom: 10px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Level = ({ levelData, onLevelComplete, onTimeout }) => {
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(levelData.timeLimit);
  const [grid, setGrid] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [timeoutModal, setTimeoutModal] = useState(false);

  useEffect(() => {
    const initializeLevel = () => {
      setFoundWords([]);
      setScore(0);
      const { grid: newGrid } = generateWordSearchGrid(
        levelData.gridSize, 
        levelData.words
      );
      setGrid(Array.isArray(newGrid) ? newGrid.flat() : []);
    };

    initializeLevel();
  }, [levelData]); // Only depend on levelData

  const handleWordFound = (word) => {
    if (!word) return;
    
    const reversedWord = word.split('').reverse().join('');
    const foundWord = levelData.words.find(w => 
      w.toUpperCase() === word.toUpperCase() || 
      w.toUpperCase() === reversedWord.toUpperCase()
    );
    
    if (foundWord && !foundWords.includes(foundWord)) {
      const newFoundWords = [...foundWords, foundWord];
      const wordScore = calculateScore(foundWord.length, timeRemaining);
      const newScore = score + wordScore;
      
      setFoundWords(newFoundWords);
      setScore(newScore);

      saveGameProgress({
        level: levelData.id,
        score: newScore,
        foundWords: newFoundWords
      });

      if (isLevelComplete(newFoundWords, levelData.words)) {
        saveHighScore(levelData.id, newScore);
        onLevelComplete(newScore);
      }
    }
  };

  const handleTimeUp = () => {
    if (onTimeout) {
      onTimeout();
    }
  };

  if (!grid.length) return null;

  return (
    <LevelContainer>
      <LevelHeader>
        <h2>Level {levelData.id}</h2>
        <Score score={score} />
        <Timer 
          key={`timer-${levelData.id}`} // Add a key to Timer
          initialTime={levelData.timeLimit}
          onTimeUp={onTimeout}
        />
      </LevelHeader>

      <WordList>
        {levelData.words.map((word, index) => (
          <Word
            key={index}
            word={word}
            found={foundWords.includes(word)}
          />
        ))}
      </WordList>

      <Grid
        size={levelData.gridSize}
        letters={grid}
        onWordFound={handleWordFound}
        foundWords={foundWords}
      />
    </LevelContainer>
  );
};

export default Level;