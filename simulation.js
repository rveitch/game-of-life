import { firstGeneration } from './lib/data/grids.js';
import { EMPTY, NEWBORN, ADULT, SENIOR } from './lib/config/constants.js';
import { TARGET_GENERATION, LOG_ALL_GENERATIONS } from './lib/config/config.js';
import { printGeneration, validateGrid } from './lib/utils/utils.js';

/**
 * Executes the Game of Life Simulation
 */
function runSimulation() {
  validateGrid(firstGeneration); // Ensure we are starting with a valid grid
  let currentGeneration = 1;
  let currentGrid = firstGeneration;

  printGeneration(currentGrid, currentGeneration);

  do {
    currentGeneration += 1;
  } while (currentGeneration < TARGET_GENERATION);
}

runSimulation();
