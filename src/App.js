import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Level from './components/Level';
import { levels } from './data/levels';
import { loadGameProgress, saveGameProgress, clearGameProgress } from './utils/storage';
import { generateWordSearchGrid } from './utils/wordGenerator';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
`;

const GameHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const MenuContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  position: relative;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  text-align: center;
  z-index: 1001;
`;

function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [highestLevel, setHighestLevel] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    // Load saved progress when app starts
    const savedProgress = loadGameProgress();
    if (savedProgress) {
      setHighestLevel(savedProgress.level);
      setTotalScore(savedProgress.score);
    }
  }, []);

  const handleLevelComplete = (levelScore) => {
    const newTotalScore = totalScore + levelScore;
    setTotalScore(newTotalScore);
    
    if (currentLevel === highestLevel) {
      const newLevel = highestLevel + 1;
      setHighestLevel(newLevel);
      
      // Save progress
      saveGameProgress({
        level: newLevel,
        score: newTotalScore
      });
    }

    setModalMessage(`Level Complete!\nScore: ${levelScore}\nTotal Score: ${newTotalScore}`);
    setShowModal(true);
  };


  const startLevel = (levelNumber) => {
    setCurrentLevel(levelNumber);
    setShowModal(false);
  };

  const resetGame = () => {
    clearGameProgress();
    setCurrentLevel(0);
    setTotalScore(0);
    setHighestLevel(1);
  };


  const renderMenu = () => (
    <MenuContainer>
      <h2>Select Level</h2>
      {levels.map((level, index) => (
        <Button
          key={level.id}
          onClick={() => startLevel(level.id)}
          disabled={level.id > highestLevel}
        >
          Level {level.id}
        </Button>
      ))}
      <h3>Total Score: {totalScore}</h3>
    </MenuContainer>
  );

  const renderLevel = () => {
    const levelData = levels.find(l => l.id === currentLevel);
    if (!levelData) return null;

    const { grid } = generateWordSearchGrid(levelData.gridSize, levelData.words);
    
    return (
      <Level
        levelData={{
          ...levelData,
          grid: grid.flat()
        }}
        onLevelComplete={handleLevelComplete}
      />
    );
  };

  return (
    <AppContainer>
      <GameHeader>
        <Title>Word Search Game</Title>
      </GameHeader>

      {currentLevel === 0 ? renderMenu() : renderLevel()}

      {showModal && (
        <ModalOverlay>
          <Modal>
            <h2>Congratulations!</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{modalMessage}</p>
            <Button onClick={() => {
              setShowModal(false);
              setCurrentLevel(currentLevel + 1);
            }}>
              Next Level
            </Button>
          </Modal>
        </ModalOverlay>
      )}
    </AppContainer>
  );
}

export default App;