import { useMutation, useQuery, useQueryClient } from "react-query";

import { ITodo, TodosApi } from "../api-service/todos-api";

interface IUseTodosListFetch {
  todos?: ITodo[];
  isLoading: boolean;
}

export function useTodosListFetch(): IUseTodosListFetch {
  const { data, isLoading } = useQuery<ITodo[]>('todos', async () => {
    const response = await TodosApi.fetchAll();
    if (!response.ok) {
       const error = await response.json();
       throw new Error(error.message);
    }
   return response.json();
   }, { refetchOnWindowFocus: false });

  return {
    todos: data,
    isLoading
  };
}

interface IUseTodosAdd {
  addTodo(title: string, date: string, description: string): void;
  isLoading: boolean;
}

export function useTodosAdd(): IUseTodosAdd {
  const queryClient = useQueryClient();
  const createTodoMotation = useMutation(
    (newTodo: ITodo) => TodosApi.create(newTodo),
    {
      onSettled: () => queryClient.invalidateQueries('todos') // force `todos` collection refetch
    }
  )

  const addTodo = (title: string, date: string, description: string) => createTodoMotation.mutate({ title, date: new Date(date), description });

  return {
    addTodo,
    isLoading: createTodoMotation.isLoading
  }
}
