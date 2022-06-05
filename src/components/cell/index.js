// Core packages
import { useContext, useCallback, useMemo } from 'react';

// Contexts
import { BoardContext } from '../../contexts/board';

// Assets
import BlackPawn from '../../assets/images/pawn_b.png';
import WhitePawn from '../../assets/images/pawn_w.png';

// Constants
import { PLAYER } from '../../constants';

// Styles
import './cell.css';

function Cell({ data = {} }) {
  const { selectCell, moveToCell, highlightedCells } = useContext(BoardContext);
  const {
    occupiedBy, backgroundColor, row, column,
  } = data;

  // Check if cell is highlighted.
  const isHighlighted = useMemo(() => (
    highlightedCells.includes(`${row}-${column}`)
  ), [row, column, highlightedCells]);

  // Move pawn to cell if cell is already highlighted, otherwise select cell and show valid moves.
  const onClick = useCallback(() => (
    isHighlighted ? moveToCell(data) : selectCell(data)
  ), [isHighlighted, moveToCell, selectCell]);

  return (
    <button aria-label="chess cell" type="button" className={`cell ${backgroundColor}`} onClick={onClick}>
      {occupiedBy && (
        <div className="pawnWrapper">
          <img src={occupiedBy === PLAYER.BLACK ? BlackPawn : WhitePawn} alt="chess pawn" className="pawn" />
        </div>
      )}
      {isHighlighted && <div className="highlighted" />}
    </button>
  );
}

export default Cell;
