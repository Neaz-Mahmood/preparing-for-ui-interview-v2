/**
 * Shuffles an array using sort with a random comparator.
 * @param arr The array to shuffle.
 * @returns The shuffled array.
 */
function randomizeArray(arr: Array<number | null>): Array<number | null> {
  return arr.sort(() => Math.random() - 0.5)
}

/**
 * Splits an array into chunks of a specified size (creating a 2D array).
 * @param arr The 1D array to split.
 * @param n The size of each chunk.
 * @returns A 2D array.
 */
function chunkify(arr: Array<number | null>, n: number): Array<Array<number | null>> {
  return Array.from(Array(n), (_, i) => arr.slice(i * n, (i + 1) * n))
}

/**
 * Generates the initial game state for the square game.
 * Creates a sorted array, shuffles it, and converts it to a 2D grid.
 * @param size The size of the grid (e.g., 3 for a 3x3 grid).
 * @returns A 2D array representing the game board.
 */
export function getGameState(size: number): Array<Array<number | null>> {
  const arr = randomizeArray(
    Array(size * size)
      .fill(null)
      .map((_, i) => (i === size * size - 1 ? null : i + 1)),
  )
  return chunkify(arr, size)
}

type TPosition = [row: number, col: number]

/**
 * Validates if a move is legal.
 * A move is legal if the target cell is adjacent (horizontally or vertically) to the empty cell.
 * @param param0 [row, col] coordinates of the clicked cell.
 * @param param1 [emptyRow, emptyCol] coordinates of the empty cell.
 * @returns True if the move is valid, false otherwise.
 */
export function validate([row, col]: TPosition, [emptyRow, emptyCol]: TPosition) {
  const validHorizontally = row === emptyRow && (col === emptyCol + 1 || col === emptyCol - 1)
  const validVertically = col === emptyCol && (row === emptyRow + 1 || row === emptyRow - 1)
  return validHorizontally || validVertically
}

/**
 * Finds the coordinates of the empty cell (null value) in the grid.
 * @param arr The 2D game grid.
 * @returns [row, col] of the empty cell.
 */
export function getEmptyPosition(arr: Array<Array<number | null>>): TPosition {
  for (let row = 0; row < arr.length; row++) {
    for (let col = 0; col < arr[0].length; col++) {
      if (arr[row][col] === null) {
        return [row, col]
      }
    }
  }
  throw Error('Invalid array')
}

/**
 * Checks if the game is won.
 * The game is won if tiles are in order 1..n with null at the end.
 * @param arr The 2D game grid.
 * @returns True if the game is won.
 */
export function isWin(arr: Array<Array<number | null>>): boolean {
  const flat = arr.flat()
  return flat.every((val, i) => (i === flat.length - 1 ? val === null : val === i + 1))
}
