export const calculateScore = (wordLength, timeRemaining) => {
    const baseScore = wordLength * 10;
    const timeBonus = Math.floor(timeRemaining / 10);
    return baseScore + timeBonus;
  };
  
  // Check if level is complete
  export const isLevelComplete = (foundWords, levelWords) => {
    return foundWords.length === levelWords.length &&
      levelWords.every(word => foundWords.includes(word));
  };
  
  // Get difficulty multiplier
  export const getDifficultyMultiplier = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 1;
      case 'medium':
        return 1.5;
      case 'hard':
        return 2;
      default:
        return 1;
    }
  };
  
  // Format time for display
  export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Generate level summary
  export const generateLevelSummary = (score, foundWords, totalTime, difficulty) => {
    const difficultyMultiplier = getDifficultyMultiplier(difficulty);
    const finalScore = Math.floor(score * difficultyMultiplier);
    
    return {
      score: finalScore,
      wordsFound: foundWords.length,
      timeSpent: formatTime(totalTime),
      difficulty,
      perfectScore: foundWords.length === totalTime
    };
  };