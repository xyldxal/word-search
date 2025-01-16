export const coordsToIndex = (x, y, size) => {
    return y * size + x;
  };
  
  // Convert index to grid coordinates
  export const indexToCoords = (index, size) => ({
    x: index % size,
    y: Math.floor(index / size)
  });
  
  // Get word from selected cells
  export const getWordFromSelection = (selectedIndices, letters, size) => {
    return selectedIndices
      .map(index => letters[index])
      .join('');
  };
  
  // Check if selection is valid (continuous and in a straight line)
  export const isValidSelection = (selectedIndices, size) => {
    if (selectedIndices.length < 2) return false;
  
    const coords = selectedIndices.map(index => indexToCoords(index, size));
    
    // Check if points are in line (same row, column, or diagonal)
    const dx = coords[1].x - coords[0].x;
    const dy = coords[1].y - coords[0].y;
    
    // Normalize direction
    const length = Math.max(Math.abs(dx), Math.abs(dy));
    const dirX = dx / length;
    const dirY = dy / length;
  
    // Check if all points follow the same direction
    for (let i = 2; i < coords.length; i++) {
      const newDx = coords[i].x - coords[i-1].x;
      const newDy = coords[i].y - coords[i-1].y;
      const newLength = Math.max(Math.abs(newDx), Math.abs(newDy));
      
      if (newDx/newLength !== dirX || newDy/newLength !== dirY) {
        return false;
      }
    }
  
    return true;
  };