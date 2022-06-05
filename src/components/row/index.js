// Custom Component
import Cell from '../cell';
// Styles
import './row.css';

function Row({ data = [] }) {
  return (
    <div className="row">
      {data.map((cellData) => <Cell data={cellData} key={`${cellData.row}-${cellData.column}`} />)}
    </div>
  );
}

export default Row;
