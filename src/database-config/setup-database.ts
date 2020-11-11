import localStorageDB from 'localstoragedb';

let database: any = null;

const _create = () => {
  var db = new localStorageDB("SampleApiMock", 'localStorage');
  if (db.isNew()) {
    db.createTable("todos", ["title", "date", "description"]);
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
