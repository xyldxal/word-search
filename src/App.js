import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Level from './components/Level';
import { levels } from './data/levels';
import { loadGameProgress, saveGameProgress, clearGameProgress } from './utils/storage';

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
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  user-select: none; // Add this

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3d8b40;
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 15px 30px; // Increased padding for better touch target
    margin: 8px;
    font-size: 1.2rem; // Slightly larger font for mobile
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 90%;
  margin: 0 auto;
`;

function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [highestLevel, setHighestLevel] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [timeoutModal, setTimeoutModal] = useState(false);

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
    setTimeoutModal(false);
  };

  const handleTimeout = () => {
    setTimeoutModal(true);
    setModalMessage("You ran out of time!");
    setShowModal(true);
  };

  const startLevel = (levelNumber) => {
    setTimeoutModal(false);
    setCurrentLevel(levelNumber);
    setShowModal(false);
    setModalMessage('');
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
          onClick={(e) => {
            e.preventDefault();
            startLevel(index + 1);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            startLevel(index + 1);
          }}
          disabled={index + 1 > highestLevel}
        >
          {level.id}
        </Button>
      ))}
      <Button 
        onClick={(e) => {
          e.preventDefault();
          resetGame();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          resetGame();
        }}
      >
        Reset Progress
      </Button>
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
        <Level
          key={`level-${currentLevel}-${Date.now()}`} // Add this key
          levelData={levelData}
          onLevelComplete={handleLevelComplete}
          onTimeout={handleTimeout}
        />
        <Button 
          onClick={() => setCurrentLevel(0)}
          style={{ position: 'absolute', top: '20px', left: '20px' }}
        >
          Back to Menu
        </Button>
      </>
    );
  };
  

  return (
    <AppContainer>
      <GameHeader>
        <Title>word search</Title>
      </GameHeader>

      {currentLevel === 0 ? renderMenu() : renderLevel()}

      {showModal && (
        <ModalOverlay>
          <Modal style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            maxWidth: '90%',
            margin: '0 auto',
          }}>
            {timeoutModal ? (
              <>
                <h2>Time's Up!</h2>
                <p>{modalMessage}</p>
                <Button 
                  style={{ padding: '10px 20px', fontSize: '16px' }}
                  onClick={() => {
                    console.log('Button 1 clicked'); // Debugging log
                    setShowModal(false);
                    setTimeoutModal(false); // Reset timeout state
                    startLevel(currentLevel); // Restart the current level
                  }}
                >
                  Try Again
                </Button>
                <Button 
                  style={{ padding: '10px 20px', fontSize: '16px' }}
                  onClick={() => {
                    console.log('Button 2 clicked'); // Debugging log
                    setShowModal(false);
                    setTimeoutModal(false);
                    setCurrentLevel(0); // Go back to menu
                  }}
                >
                  Back to Menu
                </Button>
              </>
            ) : (
              <>
                <h2>Congratulations!</h2>
                <p style={{ whiteSpace: 'pre-line' }}>{modalMessage}</p>
                <Button 
                  style={{ padding: '10px 20px', fontSize: '16px' }}
                  onClick={() => {
                    console.log('Button 3 clicked'); // Debugging log
                    setShowModal(false);
                    setCurrentLevel(currentLevel + 1);
                  }}
                >
                  Next Level
                </Button>
              </>
            )}
          </Modal>
        </ModalOverlay>
      )}
    </AppContainer>
  );
}

export default App;