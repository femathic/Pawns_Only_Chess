// Core packages
import { useContext } from 'react';

// Contexts
import { BoardContext } from '../../contexts/board';

// Custom components
import Row from '../../components/row';

// Styles
import './board.css';

function Board() {
  const {
    board, winner, playerInTurn, restart,
  } = useContext(BoardContext);

  return (
    <div className="board">
      <header>
        {winner ? <h2>{`${winner} wins -->`}</h2> : <h3>{`${playerInTurn} plays`}</h3>}
        <button type="button" aria-label="restart" onClick={restart}> Restart game</button>
      </header>
      <div className="board">
        {board.map((rowData, index) => <Row key={`row-${index + 1}`} data={rowData} />)}
      </div>
    </div>
  );
}

export default Board;
