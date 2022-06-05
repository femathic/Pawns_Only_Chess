// Constants
import { PLAYER, BOARD_LENGTH, BACKGROUND } from '../constants';

export const getPlayer = (row) => {
  if (row < 2) {
    return PLAYER.BLACK;
  } if (row >= BOARD_LENGTH - 2) {
    return PLAYER.WHITE;
  }
  return null;
};

export const getBackgroundColor = (row, column) => (
  ((row + column) % 2 === 0 ? BACKGROUND.BLACK : BACKGROUND.WHITE)
);

export const createBoard = () => {
  const board = [];
  for (let row = 0; row < BOARD_LENGTH; row += 1) {
    const boardRow = [];
    for (let column = 0; column < BOARD_LENGTH; column += 1) {
      boardRow.push({
        occupiedBy: getPlayer(row),
        row,
        column,
        hasMovedBefore: false,
        backgroundColor: getBackgroundColor(row, column),
      });
    }
    board.push(boardRow);
  }
  return board;
};

export const getOpponent = (player) => {
  if (PLAYER.WHITE === player) return PLAYER.BLACK;
  if (PLAYER.BLACK === player) return PLAYER.WHITE;
  return null;
};
