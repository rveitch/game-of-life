import { TARGET_GENERATION, LOG_ALL_GENERATIONS } from '../config/config.js';
import { EMPTY, NEWBORN, ADULT, SENIOR } from '../config/constants.js';
import { table } from 'table';

/**
 * Creates a new empty generational grid
 * @param {Array.<Array.<number>>} grid
 * @returns {Array<number>}
 */
export function initializeNextGenerationGrid(grid = []) {
  return grid.reduce((nextGen, rowData, rowNumber) => {
    nextGen[rowNumber] = new Array(rowData.length).fill(0);
    return nextGen;
  }, new Array(grid.length));
}

/**
 * Returns all adjacent neighbors of a cell
 * @param grid
 * @param cellRow
 * @param cellColumn
 * @returns {{cellRow: number, cellColumn: number, cellValue: number, cellState: string, isAlive: boolean}[]}
 */
export function getCellNeighbors(grid, cellRow, cellColumn) {
  const neighbors = [];

  for (let y = -1; y < 2; y++) {
    for (let x = -1; x < 2; x++) {
      const targetCellRow = cellRow + y;
      const targetCellCol = cellColumn + x;
      const isValidRowCoordinate = targetCellRow >= 0 && targetCellRow < grid.length;
      const isValidColumnCoordinate = targetCellCol >= 0 && targetCellCol < grid[cellRow].length;
      const isNotCurrentCell = !(targetCellRow === cellRow && targetCellCol === cellColumn);

      if (isValidRowCoordinate && isValidColumnCoordinate && isNotCurrentCell) {
        const targetCellValue = grid[targetCellRow][targetCellCol];
        neighbors.push({
          cellRow: targetCellRow,
          cellColumn: targetCellCol,
          cellValue: targetCellValue,
          cellState: ['empty', 'newborn', 'adult', 'senior'][targetCellValue],
          isAlive: [NEWBORN, ADULT, SENIOR].includes(targetCellValue),
        });
      }
    }
  }

  return neighbors;
}

/**
 * Computes the next generation of a cellular grid
 * @param {Array.<Array.<number>>} grid
 * @returns {Array<number>}
 */
export function evolveNextGeneration(grid, currentGeneration) {
  const nextGen = initializeNextGenerationGrid(grid);

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const currentCell = grid[row][col];
      const neighbors = getCellNeighbors(grid, row, col);
      const totalNeighbors = neighbors.filter((n) => n.isAlive).length;

      /** ****** Implement the Rules ****** **/

      if (currentCell === EMPTY) {
        const adultNeighbors = neighbors.filter((n) => n.cellValue === ADULT).length;
        if (adultNeighbors === 2) nextGen[row][col] = NEWBORN; // Reproduction
        else nextGen[row][col] = EMPTY; // No Change
      }

      if (currentCell === NEWBORN) {
        if (totalNeighbors >= 5) nextGen[row][col] = EMPTY; // Overcrowding
        else if (totalNeighbors <= 1) nextGen[row][col] = EMPTY; // Isolation
        else nextGen[row][col] = ADULT; // Maturing
      }

      if (currentCell === ADULT) {
        if (totalNeighbors >= 3) nextGen[row][col] = EMPTY; // Overcrowding
        else if (totalNeighbors === 0) nextGen[row][col] = EMPTY; // Isolation
        else nextGen[row][col] = SENIOR; // Maturing
      }

      if (currentCell === SENIOR) nextGen[row][col] = EMPTY; // Death
    }
  }

  if (LOG_ALL_GENERATIONS || currentGeneration === TARGET_GENERATION) {
    printGeneration(nextGen, currentGeneration);
  }

  return nextGen;
}

/**
 *
 * @param {Array<number>} grid
 * @param {number} generationNumber
 * @param {*} [emptyCellValue]
 */
export function printGeneration(grid, generationNumber, emptyCellValue = ' ') {
  const newGrid = [];
  for (let row = 0; row < grid.length; row++) {
    const currentRow = [];
    for (let col = 0; col < grid[row].length; col++) {
      let cellValue = grid[row][col];
      if (cellValue === EMPTY) cellValue = emptyCellValue;
      currentRow.push(` ${cellValue} `);
    }
    newGrid.push(currentRow);
  }
  console.log('\n', `Generation ${generationNumber}`);
  console.log(table(newGrid));
}

/**
 * Checks if a given grid is valid
 * @param {Array.<Array.<number>>} grid
 * @returns {boolean}
 */
export function isValidGrid(grid) {
  return (
    Array.isArray(grid) &&
    grid.every((row) => {
      const hasValidRowLength = row.length === grid.length;
      const hasValidRowValues = row.every((cell) => [EMPTY, NEWBORN, ADULT, SENIOR].includes(cell));
      return hasValidRowLength && hasValidRowValues;
    })
  );
}

/**
 * Throws an error if the evaluated grid is invalid
 * @param {Array.<Array.<number>>} grid
 */
export function validateGrid(grid) {
  if (!isValidGrid(grid)) {
    throw new Error(`Invalid Grid: ${JSON.stringify(grid)}`);
  }
}
