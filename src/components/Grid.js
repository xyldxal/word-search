import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { isValidSelection, getWordFromSelection, indexToCoords, coordsToIndex } from '../utils/gridHelper';

const GridContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${props => props.size}, 1fr);
  gap: 2px;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%; /* Allow full width for smaller grids */
  margin: 0 auto;
  touch-action: none; /* Only prevent default touch actions on the grid */

  @media (max-width: 768px) {
    padding: 5px;
    gap: 1px;
    max-width: 95vw;
  }
`;

const SelectionLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Cell = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  color: #333;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const Grid = ({ size, letters, onWordFound, foundWords = [] }) => {
  const [selectedCells, setSelectedCells] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [foundCells, setFoundCells] = useState(new Set());
  const gridRef = useRef(null);

  const colors = [
    '#FF9AA2', // pink
    '#FFB7B2', // salmon
    '#FFDAC1', // peach
    '#E2F0CB', // light green
    '#B5EAD7', // mint
    '#C7CEEA', // periwinkle
    '#9DD6FF', // light blue
  ];

  const calculateSelectionStyle = () => {
    if (selectedCells.length < 2 || !gridRef.current) return null;

    const gridRect = gridRef.current.getBoundingClientRect();
    const gap = 2;
    const padding = 10;
    const totalGaps = size - 1;
    const availableSpace = gridRect.width - (2 * padding) - (totalGaps * gap);
    const cellSize = availableSpace / size;
    const fullCellSize = cellSize + gap;
    
    const startCell = selectedCells[0];
    const endCell = selectedCells[selectedCells.length - 1];
    const start = indexToCoords(startCell, size);
    const end = indexToCoords(endCell, size);

    const dx = end.x - start.x;
    const dy = end.y - start.y;
    
    // Calculate center points for all cases
    const x1 = padding + (start.x * fullCellSize) + cellSize/2;
    const y1 = padding + (start.y * fullCellSize) + cellSize/2;
    const x2 = padding + (end.x * fullCellSize) + cellSize/2;
    const y2 = padding + (end.y * fullCellSize) + cellSize/2;
    
    const colorIndex = Math.floor(Math.random() * colors.length);
    
    return {
      x1: `${x1}px`,
      y1: `${y1}px`,
      x2: `${x2}px`,
      y2: `${y2}px`,
      stroke: colors[colorIndex],
      strokeWidth: cellSize,
    };
  };

  const renderHighlights = () => {
    const styles = [];
    
    // Add current selection highlight
    const selectionStyle = calculateSelectionStyle();
    if (selectionStyle) {
      styles.push({
        ...selectionStyle,
        opacity: 0.3,
        key: 'selection'
      });
    }
    
    // Add permanent highlights for found words
    foundWords.forEach((word, wordIndex) => {
      for (let startIndex = 0; startIndex < letters.length; startIndex++) {
        const directions = [
          { dx: 1, dy: 0 },    // right
          { dx: -1, dy: 0 },   // left
          { dx: 0, dy: 1 },    // down
          { dx: 0, dy: -1 },   // up
          { dx: 1, dy: 1 },    // diagonal right-down
          { dx: -1, dy: -1 },  // diagonal left-up
          { dx: 1, dy: -1 },   // diagonal right-up
          { dx: -1, dy: 1 },   // diagonal left-down
        ];

        for (const { dx, dy } of directions) {
          let currentWord = '';
          let x1, y1, x2, y2;
          
          const { x: startX, y: startY } = indexToCoords(startIndex, size);
          const gridRect = gridRef.current.getBoundingClientRect();
          const gap = 2;
          const padding = 10;
          const totalGaps = size - 1;
          const availableSpace = gridRect.width - (2 * padding) - (totalGaps * gap);
          const cellSize = availableSpace / size;
          const fullCellSize = cellSize + gap;
          
          for (let i = 0; i < word.length; i++) {
            const newX = startX + (dx * i);
            const newY = startY + (dy * i);
            
            // Check boundaries
            if (newX < 0 || newX >= size || newY < 0 || newY >= size) break;
            
            const index = coordsToIndex(newX, newY, size);
            currentWord += letters[index];
            
            if (i === 0) {
              x1 = padding + (newX * fullCellSize) + cellSize/2;
              y1 = padding + (newY * fullCellSize) + cellSize/2;
            } else if (i === word.length - 1) {
              x2 = padding + (newX * fullCellSize) + cellSize/2;
              y2 = padding + (newY * fullCellSize) + cellSize/2;
            }
          }
          
          if (currentWord === word || currentWord === word.split('').reverse().join('')) {
            styles.push({
              x1: `${x1}px`,
              y1: `${y1}px`,
              x2: `${x2}px`,
              y2: `${y2}px`,
              stroke: colors[wordIndex % colors.length],
              strokeWidth: cellSize,
              opacity: 0.3,
              key: `found-${wordIndex}-${startIndex}-${dx}-${dy}`
            });
            break; // Found the word, no need to check other directions from this start point
          }
        }
      }
    });

    return (
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {styles.map(style => (
          <line
            key={style.key}
            x1={style.x1}
            y1={style.y1}
            x2={style.x2}
            y2={style.y2}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            strokeLinecap="round"
            opacity={style.opacity}
          />
        ))}
      </svg>
    );
  };

  useEffect(() => {
    const style = calculateSelectionStyle();
    if (!style) return;
  }, [selectedCells]);

  useEffect(() => {
    const newFoundCells = new Set();
    
    for (let startIndex = 0; startIndex < letters.length; startIndex++) {
      for (const word of foundWords) {
        // Check all 8 directions from this starting point
        const directions = [
          { dx: 1, dy: 0 },    // right
          { dx: -1, dy: 0 },   // left
          { dx: 0, dy: 1 },    // down
          { dx: 0, dy: -1 },   // up
          { dx: 1, dy: 1 },    // diagonal right-down
          { dx: -1, dy: -1 },  // diagonal left-up
          { dx: 1, dy: -1 },   // diagonal right-up
          { dx: -1, dy: 1 },   // diagonal left-down
        ];

        for (const { dx, dy } of directions) {
          let indices = [];
          let currentWord = '';
          let currentIndex = startIndex;
          
          for (let i = 0; i < word.length; i++) {
            const { x, y } = indexToCoords(currentIndex, size);
            const newX = x + (dx * i);
            const newY = y + (dy * i);
            
            // Check boundaries
            if (newX < 0 || newX >= size || newY < 0 || newY >= size) break;
            
            const index = coordsToIndex(newX, newY, size);
            currentWord += letters[index];
            indices.push(index);
          }
          
          if (currentWord === word || currentWord === word.split('').reverse().join('')) {
            indices.forEach(index => newFoundCells.add(index));
          }
        }
      }
    }
    
    setFoundCells(newFoundCells);
  }, [foundWords, letters, size]);

  useEffect(() => {
    // Reset selected cells when grid size changes
    setSelectedCells([]);
  }, [size]);

  const handleCellMouseDown = (index) => {
    setIsDragging(true);
    setSelectedCells([index]);
  };

  const handleCellMouseEnter = (index) => {
    if (isDragging) {
      const newSelection = [...selectedCells, index];
      if (isValidSelection(newSelection, size)) {
        setSelectedCells(newSelection);
      }
    }
  };

  const handleCellMouseUp = () => {
    setIsDragging(false);
    if (selectedCells.length >= 2) {
      const word = getWordFromSelection(selectedCells, letters, size);
      onWordFound(word);
    }
    setSelectedCells([]);
  };

  const handleTouchStart = (index, e) => {
    e.preventDefault();
    setIsDragging(true);
    setSelectedCells([index]);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isDragging || !gridRef.current) return;

    const touch = e.touches[0];
    const grid = gridRef.current;
    const gridRect = grid.getBoundingClientRect();
    const cellWidth = gridRect.width / size;
    const cellHeight = gridRect.height / size;

    // Get touch position relative to grid
    const x = touch.clientX - gridRect.left;
    const y = touch.clientY - gridRect.top;

    // Convert to grid coordinates
    const col = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);

    if (col >= 0 && col < size && row >= 0 && row < size) {
      const index = row * size + col;
      const newSelection = [...selectedCells];
      
      // Only add if it's not the last cell selected
      if (index !== newSelection[newSelection.length - 1]) {
        newSelection.push(index);
        if (isValidSelection(newSelection, size)) {
          setSelectedCells(newSelection);
        }
      }
    }
  };

  const handleTouchEnd = () => {
    if (selectedCells.length >= 2) {
      const word = getWordFromSelection(selectedCells, letters, size);
      onWordFound(word);
    }
    setIsDragging(false);
    setSelectedCells([]);
  };

  return (
    <GridContainer 
      ref={gridRef}
      size={size}
      onMouseLeave={() => {
        setIsDragging(false);
        setSelectedCells([]);
      }}
      onTouchStart={(e) => e.preventDefault()}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <SelectionLine>
        {renderHighlights()}
      </SelectionLine>
      {letters.map((letter, index) => (
        <Cell
          key={index}
          onMouseDown={() => handleCellMouseDown(index)}
          onMouseEnter={() => handleCellMouseEnter(index)}
          onMouseUp={handleCellMouseUp}
          onTouchStart={(e) => handleTouchStart(index, e)}
        >
          {letter}
        </Cell>
      ))}
    </GridContainer>
  );
};

export default Grid;