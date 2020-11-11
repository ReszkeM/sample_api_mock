import { rest } from 'msw';

export const todoHandlers = [
  rest.get('https://sample-api-mock.com/todos', (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(202, 'Mocked status'),
      ctx.json({
        message: 'Mocked response JSON body'
      }),
    )
  }),
  rest.post('https://sample-api-mock.com/todos', (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(202, 'Mocked status')
    )
  }),
  rest.put('https://sample-api-mock.com/todos', (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(403),
      ctx.json({
        errorMessage: 'Not authorized',
      }),
    )
  }),
  rest.delete('https://sample-api-mock.com/todos', (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(202, 'Mocked status')
    )
  })
];
