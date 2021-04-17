import React, { useCallback, useState } from 'react';

import { Loader } from '../components/loader';
import { useTodosAdd } from '../hooks/todos-api';

import './TodoForm.css';

export const TodoForm: React.FC = () => {
  const todoAddApi = useTodosAdd();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = useCallback((e) => setTitle(e.target.value), [setTitle]);
  const handleDateChange = useCallback((e) => setDate(e.target.value), [setDate]);
  const handleDescriptionChange = useCallback((e) => setDescription(e.target.value), [setDescription]);
  const handleSave = () => todoAddApi.addTodo(title, date, description);

  return (
    <>
      <div className="todos-form">
        <div className="form-item">
          <label htmlFor="title-field">Title</label>
          <input id="title-field" value={title} onChange={handleTitleChange} />
        </div>
        <div className="form-item">
          <label htmlFor="date-field">Date</label>
          <input id="date-field" value={date} onChange={handleDateChange} />
        </div>
        <div className="form-item">
          <label htmlFor="description-field">Description</label>
          <input id="description-field" value={description} onChange={handleDescriptionChange} />
        </div>
      </div>
      <div>
        {todoAddApi.isLoading && (
          <Loader />
        )}
        {!todoAddApi.isLoading && (
          <button onClick={handleSave}>
            Save
          </button>
        )}
      </div>
    </>
  );
}
