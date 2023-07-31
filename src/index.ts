const testBoard16Tile = [[2, 3, 4, 0], [4, 0, 2, 0], [3, 4, 0, 2], [0, 2, 3, 4]] 
const testBoard16Tile2 = [[0, 3, 0, 1], [0, 1, 4, 3], [1, 4, 3, 0], [3, 0, 1, 4]]
const testBoard16Tile3 = [[0, 0, 0, 0], [1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2]]

function solve16Tile (board: number[][]) {
  if (board.length != 4) {
    throw new Error("Invalid board length")  
  } 
  
  const coordBoard: coordTile[] = []

  for(let y = 0; y < board.length; y++) {
    board[y].map((tile, x) => {
     coordBoard.push(
        {
          tile,
          x,
          y,
          possibleTiles: (tile == 0) ? [1,2,3,4]: [tile]
        }
      )
    })
  }  
  
  solveCoordBoard(coordBoard)
  createReturnBoard(coordBoard)
}

type coordTile = {
  tile: number,
  x: number,
  y: number,
  possibleTiles: number[]
}

const solveCoordBoard = (coordBoard: coordTile[]) => {
  let reps = 0;
  while (boardIsNotSolved(coordBoard)) {
  for (const currTile of coordBoard)  {
    if (currTile.possibleTiles.length == 1) continue;

    const sameXandY = coordBoard.filter((tile) => tile.x == currTile.x || tile.y == currTile.y)
    // const excludingTiles = sameXandY.map((tile) => tile.tile).filter((tile, i, array) => array.indexOf(tile) === i && tile != 0)
    const excludingTiles = new Set()
    sameXandY.map(tile => tile.tile != 0 ? excludingTiles.add(tile.tile) : excludingTiles)
    currTile.possibleTiles = currTile.possibleTiles.filter((tile) => !excludingTiles.has(tile))
    if (currTile.possibleTiles.length == 1) currTile.tile = currTile.possibleTiles[0];
    //Finds all solved tiles on same row and column and filters the possible tiles.
  }
    reps++
  }
  if (reps > 5) { throw new Error('Too many repititions while searching for solution.') }
  console.log(`Found Solution in ${reps} repititions.`)
}

const boardIsNotSolved = (coordBoard: coordTile[]) => {
  for (const currTile of coordBoard) {
    if (currTile.possibleTiles.length > 1 || currTile.tile == 0) return true;
  }
  return false;
}

const createReturnBoard = (coordBoard: coordTile[]) => {
  const returnBoard: number[][]  = [[],[],[],[]]
  for (const currTile of coordBoard) {
   returnBoard[currTile.y][currTile.x] = currTile.tile 
  }
  console.log(returnBoard)
}

//solve16Tile(testBoard16Tile)
solve16Tile(testBoard16Tile2)
