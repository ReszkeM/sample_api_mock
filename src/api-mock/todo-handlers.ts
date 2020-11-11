import { rest } from 'msw';
import { getDatabase } from '../database-config/setup-database';

export const todoHandlers = [
  rest.get('https://sample-api-mock.com/todos', (req, res, ctx) => {
    const todos = getDatabase().queryAll('todos');

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json(todos),
    )
  }),
  rest.get('https://sample-api-mock.com/todos/:todoId', (req, res, ctx) => {
    const { todoId } = req.params;

    const todos = getDatabase().queryAll("todos", { query: { ID: todoId } });

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json(todos),
    )
  }),
  rest.post('https://sample-api-mock.com/todos', (req, res, ctx) => {
    const db = getDatabase();
    db.insert("todos", req.body);
    db.commit();

    return res(
      ctx.delay(1000),
      ctx.status(200),
    )
  }),
  rest.put('https://sample-api-mock.com/todos:todoId', (req, res, ctx) => {
    const { todoId } = req.params;

    const db = getDatabase();
    db.update("todos", { ID: todoId }, () => req.body);
    db.commit();

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({
        errorMessage: 'Not authorized',
      }),
    )
  }),
  rest.delete('https://sample-api-mock.com/todos/:todoId', (req, res, ctx) => {
    const { todoId } = req.params;

    const db = getDatabase();
    db.deleteRows("todos", { ID: todoId });
    db.commit();

    return res(
      ctx.delay(1000),
      ctx.status(200),
    )
  })
];
