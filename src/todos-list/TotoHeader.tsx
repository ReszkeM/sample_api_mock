import * as React from 'react';

import './TodoItem.css';

export const TodoHeader: React.FC = () => {
  return (
    <div className="todos-item">
      <div>TITLE</div>
      <div>DATE</div>
      <div>DESCRIPTON</div>
    </div>
  );
}
