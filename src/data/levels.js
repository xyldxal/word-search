// src/data/levels.js
export const levels = [
    {
      id: 1,
      gridSize: 15,
      words: ['SHABU', 'PEKPEK', 'BURAT', 'KIFFY', 'VLAT', 'POKPOK', 'BETLOG'],
      timeLimit: 120,
      difficulty: 'easy'
    },
    {
      id: 2,
      gridSize: 15,
      words: ['TONI', 'FOWLER', 'JIAFEI'],
      timeLimit: 120,
      difficulty: 'easy'
    },
    // Add more levels following the same pattern
  ];
  
  // Helper function to generate the grid for each level
  export const generateGrid = (size, words) => {
    // Create empty grid
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