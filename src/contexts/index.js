// Contexts
import BoardProvider from './board';

function AllContextsProvider({ children }) {
  return (
    <BoardProvider>
      {children}
    </BoardProvider>
  );
}

export default AllContextsProvider;
