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

const Level = ({ levelData, onLevelComplete }) => {
  const [foundWords, setFoundWords] = useState([]);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(levelData.timeLimit);
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    // Generate grid when level starts
    const { grid: newGrid } = generateWordSearchGrid(
      levelData.gridSize, 
      levelData.words
    );
    setGrid(newGrid);
  }, [levelData]);

  const handleWordFound = (word) => {
    // Check both forward and reverse directions
    const reversedWord = word.split('').reverse().join('');
    const foundWord = levelData.words.find(w => w === word || w === reversedWord);
    
    if (foundWord && !foundWords.includes(foundWord)) {
      const newFoundWords = [...foundWords, foundWord];
      const wordScore = calculateScore(foundWord.length, timeRemaining);
      const newScore = score + wordScore;
      
      setFoundWords(newFoundWords);
      setScore(newScore);

      // Save progress
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

  return (
    <LevelContainer>
      <LevelHeader>
        <h2>Level {levelData.id}</h2>
        <Score score={score} />
        <Timer 
          initialTime={levelData.timeLimit}
          onTimeUp={() => onLevelComplete(score)}
        />
      </LevelHeader>

      <WordList>
        <Word 
          words={levelData.words}
          foundWords={foundWords}
        />
      </WordList>

      <Grid
        size={levelData.gridSize}
        letters={grid.flat()} // Convert 2D array to 1D
        onWordFound={handleWordFound}
        foundWords={foundWords}
      />
    </LevelContainer>
  );
};

export default Level;