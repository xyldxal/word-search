// src/data/levels.js
export const levels = [
    {
      id: 1,
      gridSize: 10,
      words: ['HARP', 'DOCTOR', 'CHIP', 'THINK'],
      timeLimit: 120,
      difficulty: 'easy'
    },
    {
      id: 2,
      gridSize: 10,
      words: ['GREAT', 'IDEA', 'REASON', 'VOTE'],
      timeLimit: 120,
      difficulty: 'easy'
    },
    {
      id: 3,
      gridSize: 10,
      words: ['APPLE', 'STONE', 'HARMONY', 'COFFEE'],
      timeLimit: 120,
      difficulty: 'easy'
    },
  ];
  
  export const generateGrid = (size, words) => {
    const grid = Array(size * size).fill('');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    // Place words in grid (simplified version)
    words.forEach(word => {
      const position = Math.floor(Math.random() * (size * size - word.length));
      for (let i = 0; i < word.length; i++) {
        grid[position + i] = word[i];
      }
    });
  
    // Fill remaining empty spaces with random letters
    return grid.map(cell => cell === '' ? 
      letters.charAt(Math.floor(Math.random() * letters.length)) : cell
    );
  };