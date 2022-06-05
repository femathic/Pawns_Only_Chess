// Core Packages
import {
  createContext, useState, useMemo, useCallback,
} from 'react';

// Constants
import { PLAYER, BOARD_LENGTH } from '../../constants';

// Utils
import { createBoard, getOpponent } from '../../utils/helper';

export const BoardContext = createContext({});

function BoardProvider({ children }) {
  const [board, setBoard] = useState(createBoard);
  const [playerInTurn, setPlayerInTurn] = useState(PLAYER.WHITE);
  const [winner, setWinner] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [highlightedCells, setHighlightedCell] = useState([]);

  /**
   * Board utility functions : check if a cell is valid, is empty or contains opponent.
  */
  const isValidCell = useCallback((row, column) => !!board?.[row]?.[column], [board]);
  const isEmptyCell = useCallback((row, column) => (
    !!(board?.[row]?.[column].occupiedBy === null)
  ), [board]);
  const isOpponentCell = useCallback((row, column, occupiedBy) => (
    !!(board?.[row]?.[column].occupiedBy && board?.[row]?.[column].occupiedBy !== occupiedBy)
  ), [board]);

  /**
   * Highlights valid moves cells when a pawn is clicked.
   * @param {*} cell
  */
  const selectCell = useCallback((cell) => {
    const {
      row, column, occupiedBy, hasMovedBefore,
    } = cell;
    if (!occupiedBy || occupiedBy !== playerInTurn) return;
    setSelectedCell({ ...cell });
    const newHighlightedCells = [];
    // Forward movements
    if (isValidCell(occupiedBy === PLAYER.WHITE ? row - 1 : row + 1, column)
        && isEmptyCell(occupiedBy === PLAYER.WHITE ? row - 1 : row + 1, column)) {
      newHighlightedCells.push(`${occupiedBy === PLAYER.WHITE ? row - 1 : row + 1}-${column}`);
    }
    if (isValidCell(occupiedBy === PLAYER.WHITE ? row - 2 : row + 2, column) && !hasMovedBefore
        && isEmptyCell(occupiedBy === PLAYER.WHITE ? row - 2 : row + 2, column)) {
      newHighlightedCells.push(`${occupiedBy === PLAYER.WHITE ? row - 2 : row + 2}-${column}`);
    }
    // Diagonal movement for capturing
    if (
      isValidCell(occupiedBy === PLAYER.WHITE ? row - 1 : row + 1, column - 1)
      && isOpponentCell(occupiedBy === PLAYER.WHITE ? row - 1 : row + 1, column - 1, occupiedBy)
    ) {
      newHighlightedCells.push(`${occupiedBy === PLAYER.WHITE ? row - 1 : row + 1}-${column - 1}`);
    }
    if (
      isValidCell(occupiedBy === PLAYER.WHITE ? row - 1 : row + 1, column + 1)
      && isOpponentCell(occupiedBy === PLAYER.WHITE ? row - 1 : row + 1, column + 1, occupiedBy)
    ) {
      newHighlightedCells.push(`${occupiedBy === PLAYER.WHITE ? row - 1 : row + 1}-${column + 1}`);
    }
    setHighlightedCell(newHighlightedCells);
  }, [board, isValidCell, isOpponentCell, playerInTurn]);

  /**
    * Make a valid pawn movement to selected highlighted cell (valid move cell) when clicked.
    * @param {*} cell
  */
  const moveToCell = useCallback((cell) => {
    const { row, column } = cell;
    if (!highlightedCells.includes(`${row}-${column}`) || !selectedCell) return;
    const { row: selectedRow, column: selectedColumn, occupiedBy: selected } = selectedCell;
    const newBoard = [...board];
    // Update board with new movement
    newBoard[row][column] = {
      ...newBoard[row][column], occupiedBy: selected, hasMovedBefore: true,
    };
    newBoard[selectedRow][selectedColumn] = {
      ...newBoard[selectedRow][selectedColumn], occupiedBy: null, hasMovedBefore: false,
    };
    // Update necessary states accordingly
    if (row === BOARD_LENGTH - 1 || row === 0) {
      setWinner(selected);
      setPlayerInTurn(null);
    } else {
      setWinner(null);
      setPlayerInTurn(getOpponent(playerInTurn));
    }
    setBoard(newBoard);
    setSelectedCell(null);
    setHighlightedCell([]);
  }, [board, selectedCell, playerInTurn]);

  /**
    * Restart Game by restoring all states to default values.
  */
  const restart = useCallback(() => {
    setBoard(createBoard);
    setPlayerInTurn(PLAYER.WHITE);
    setWinner(null);
    setSelectedCell(null);
    setHighlightedCell([]);
  }, [setBoard, setPlayerInTurn, setWinner, setSelectedCell, setHighlightedCell]);

  /**
   * Pack up Variables and Functions to be provided by the BoardContext.
  */
  const contextValues = useMemo(() => ({
    board, highlightedCells, winner, playerInTurn, restart, selectCell, moveToCell,
  }), [board, highlightedCells, winner, playerInTurn, restart, selectCell, moveToCell]);

  return (
    <BoardContext.Provider value={contextValues}>
      {children}
    </BoardContext.Provider>
  );
}

export default BoardProvider;
