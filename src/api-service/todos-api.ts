const BASE_API_URL = 'https://sample-api-mock.com/todos';

export interface ITodo {
  ID?: number;
  title: string;
  date: Date;
  description: string;
}

export class TodosApi {
  static create = (todo: ITodo) => {
    return fetch(BASE_API_URL, { method: 'POST', body: JSON.stringify(todo) })
  }

  static fetchAll = () => {
    return fetch(BASE_API_URL, { method: 'GET' });
  }

  static fetchById = (id: number): Promise<any> => {
    return fetch(`${BASE_API_URL}/${id}`, { method: 'GET' });
  }

  static update = (id: number, todo: ITodo) => {
    return fetch(`${BASE_API_URL}/${id}`, { method: 'PATCH', body: JSON.stringify(todo) });
  }

  static remove = (id: number) => {
    return fetch(`${BASE_API_URL}/${id}`, { method: 'DELETE' });
  }
}
