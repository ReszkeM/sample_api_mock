import * as React from 'react';

import { Loader } from '../components/loader';
import { useTodosListFetch } from '../hooks/todos-api';
import { TodoItem } from './TodoItem';
import { TodoHeader } from './TotoHeader';

import './TodosList.css';

export const TodosList: React.FC = () => {
  const { todos, isLoading } = useTodosListFetch();

  return (
    <div className="todos-list">
      <TodoHeader />
      {isLoading && <Loader />}
      {!isLoading && todos && todos.map(todo => <TodoItem todo={todo} key={todo.ID} />)}
    </div>
  );
}
