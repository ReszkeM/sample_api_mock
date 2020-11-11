# Sample api mock using MSW and LocalStorageDB

## MSW

### Usefull links
- https://github.com/mswjs/msw
- https://mswjs.io/docs/

### Instalation
```
npm install msw --save-dev
# or
yarn add msw --dev
```

### Sample mock definition
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

### Init service worker
```
npx msw init public/
```

### Setup workers
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

## localStorageDB

### Usefull links
- https://github.com/knadh/localStorageDB

### Instalation
```
npm install localstoragedb --save-dev
# or
yarn add localstoragedb --dev

```

### Adding types
When using typesctipt my VSCodium couldn't detect types, probably because of wrong file name.  
VSC is looking for `node_modules/localstoragedb/localstoragedb.d.ts` when file is actually under `node_modules/localstoragedb/localStorageDB.d.ts`, so it simpl uses CamelCase.  
To make it work you can simply copy the content of `node_modules/localstoragedb/localStorageDB.d.ts` and create your types file `src/@types/localstoragedb.d.ts`.  

### Setup database
- You can simply create your db by type:
```
var db = new localStorageDB('SampleApiMock', 'localStorage');
```

- For create table and push object use `createTable` and `insert` commands, then run `commit` to save it:
```
db.createTable('todos', ['id', 'title', 'date', 'description']);
db.insert('todos', { id: 1, title: 'My 1st todo', date: "11.11.2020", description: 'Some description' });
db.commit();
```

- Second usage of database  
When database is once created then `new localStorageDB('SampleApiMock', 'localStorage')` returns already created db with your tables and records.  
It's important to use `db.isNew()` check when creating table and filling database with default records.  
So the implementation should looks like that:
```
if (db.isNew()) {
  db.createTable('todos', ['id', 'title', 'date', 'description']);
  db.insert('todos', { id: 1, title: 'My 1st todo', date: "11.11.2020", description: 'Some description' });
  db.commit();
}
``` 

- Full implementation using singleton to create and get database
```
import localStorageDB from 'localstoragedb';

let database: any = null;

const _create = () => {
  var db = new localStorageDB('SampleApiMock', 'localStorage');
  if (db.isNew()) {
    db.createTable('todos', ['id', 'title', 'date', 'description']);
    db.commit();
  }
  return db;
}

export const getDatabase = () => {
  if (!database) {
    database = _create();
  }
  return database;
}
```