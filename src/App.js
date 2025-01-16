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
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const GameHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 5px;
  }
`;

const MenuContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  
  @media (max-width: 768px) {
    max-width: 95%;
    padding: 15px;
  }
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
  touch-action: manipulation; /* Improve touch response */
  -webkit-tap-highlight-color: transparent; /* Remove tap highlight on iOS */

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3d8b40; /* Darker color when pressed */
    transform: scale(0.98); /* Slight scale down when pressed */
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 12px 24px; /* Larger touch target on mobile */
    font-size: 1rem;
    margin: 8px;
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
          onClick={() => startLevel(index + 1)}
          disabled={index + 1 > highestLevel}
        >
          Level {level.id}
        </Button>
      ))}
      <Button onClick={resetGame}>Reset Progress</Button>
      <h3>Total Score: {totalScore}</h3>
    </MenuContainer>
  );

  const renderLevel = () => {
    const levelData = levels[currentLevel - 1];
    if (!levelData) {
      setCurrentLevel(0);
      return null;
    }

    return (
      <>
        <Button 
          onClick={() => setCurrentLevel(0)}
          style={{ position: 'absolute', top: '20px', left: '20px' }}
        >
          Back to Menu
        </Button>
        <Level
          levelData={levelData}
          onLevelComplete={handleLevelComplete}
        />
      </>
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