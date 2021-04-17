import * as React from 'react';

import { ITodo } from '../api-service/todos-api';

import './TodoItem.css';

interface IProps {
  todo: ITodo;
}

export const TodoItem: React.FC<IProps> = ({ todo }) => {
  return (
    <div className="todos-item">
      <div>{todo.title}</div>
      <div>{todo.date}</div>
      <div>{todo.description}</div>
    </div>
  );
}
