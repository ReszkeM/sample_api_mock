# Sample api mock using MSW and LocalStorageDB

# MSW

## Usefull links
- https://github.com/mswjs/msw
- https://mswjs.io/docs/

## Instalation
```
npm install msw --save-dev
# or
yarn add msw --dev
```

## Sample mock definition
create file, eg. `src/mocks/octocat-handlers.ts` with sample mocks:
```
import { rest } from 'msw';

export const octocatHandlers = [
  rest.get('https://github.com/octocat', (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(202, 'Mocked status'),
      ctx.json({
        message: 'Mocked response JSON body'
      }),
    )
  }),
  rest.post('https://github.com/octocat', (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(202, 'Mocked status')
    )
  }),
  rest.put('https://github.com/octocat', (req, res, ctx) => {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: 'Not authorized',
      }),
    )
  })
];
```

## Init service worker
```
npx msw init public/
```

## Setup workers
create file, eg. `src/mocks/setup-worker.ts` and setup worker with your example mocks:
```
import { setupWorker } from 'msw'
import { octocatHandlers } from './octocat-handlers'

export const worker = setupWorker(...octocatHandlers)
```

then start worker in yours `index.tsx`
```
import { worker } from './mocks/setup-worker';

worker.start()
```