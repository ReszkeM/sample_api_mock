import { QueryClient, QueryClientProvider } from 'react-query'

import { worker } from './api-mock/setup-worker';
import { TodosList } from './todos-list';
import { TodoForm } from './todo-form';

import './App.css';

const queryClient = new QueryClient()

worker.start()

function App() {
  return (
    <div className="App">
      <header className="body">
        <QueryClientProvider client={queryClient}>
          <TodosList />
          <hr className="separator" />
          <TodoForm />
        </QueryClientProvider>
      </header>
    </div>
  );
}

export default App;
