// Contexts
import AllContextsProvider from './contexts';

// Pages
import Board from './pages/board';

function App() {
  return (
    <AllContextsProvider>
      <Board />
    </AllContextsProvider>
  );
}

export default App;
