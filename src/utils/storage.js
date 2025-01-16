// src/utils/storage.js

const STORAGE_KEY = 'wordSearchGame';

export const saveGameProgress = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving game progress:', error);
    return false;
  }
};

export const loadGameProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading game progress:', error);
    return null;
  }
};

export const clearGameProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing game progress:', error);
    return false;
  }
};

export const saveHighScore = (level, score) => {
  try {
    const highScores = JSON.parse(localStorage.getItem('wordSearchHighScores') || '{}');
    if (!highScores[level] || score > highScores[level]) {
      highScores[level] = score;
      localStorage.setItem('wordSearchHighScores', JSON.stringify(highScores));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving high score:', error);
    return false;
  }
};