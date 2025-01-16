const DIRECTIONS = [
    { x: 1, y: 0 },   // right
    { x: 0, y: 1 },   // down
    { x: 1, y: 1 },   // diagonal right-down
    { x: -1, y: 0 },  // left
    { x: 0, y: -1 },  // up
    { x: -1, y: -1 }, // diagonal left-up
    { x: 1, y: -1 },  // diagonal right-up
    { x: -1, y: 1 },  // diagonal left-down
  ];
  
  // Check if a word can be placed at a specific position and direction
  const canPlaceWord = (grid, word, pos, dir, size) => {
    const { x: dx, y: dy } = dir;
    const wordLength = word.length;
  
    for (let i = 0; i < wordLength; i++) {
      const newX = pos.x + (dx * i);
      const newY = pos.y + (dy * i);
  
      // Check boundaries
      if (newX < 0 || newX >= size || newY < 0 || newY >= size) {
        return false;
      }
  
      // Check if cell is empty or has the same letter
      const currentCell = grid[newY][newX];
      if (currentCell !== '' && currentCell !== word[i]) {
        return false;
      }
    }
    return true;
  };
  
  // Place a word in the grid
  const placeWord = (grid, word, pos, dir) => {
    const { x: dx, y: dy } = dir;
    
    for (let i = 0; i < word.length; i++) {
      const newX = pos.x + (dx * i);
      const newY = pos.y + (dy * i);
      grid[newY][newX] = word[i];
    }
  };
  
  // Generate the complete grid with words
  export const generateWordSearchGrid = (size, words) => {
    // Initialize empty grid
    const grid = Array(size).fill().map(() => Array(size).fill(''));
    const placedWords = [];
  
    // Sort words by length (longest first)
    const sortedWords = [...words].sort((a, b) => b.length - a.length);
  
    // Try to place each word
    sortedWords.forEach(word => {
      let placed = false;
      let attempts = 0;
      const maxAttempts = size * size;
  
      while (!placed && attempts < maxAttempts) {
        const pos = {
          x: Math.floor(Math.random() * size),
          y: Math.floor(Math.random() * size)
        };
        const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  
        if (canPlaceWord(grid, word, pos, dir, size)) {
          placeWord(grid, word, pos, dir);
          placedWords.push(word);
          placed = true;
        }
        attempts++;
      }
    });
  
    // Fill remaining empty cells with random letters
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (grid[y][x] === '') {
          grid[y][x] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }
  
    return { grid, placedWords };
  };