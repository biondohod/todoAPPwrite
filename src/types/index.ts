export type IAppwriteConfig = {
  projectId: string;
  url: string;
};

export type INewUser = {
  name: string;
  email: string;
  password: string;
};

export type ILogInUser = {
  email: string;
  password: string;
}

export type TodoItem = {
  email: string;
  todo: string;
  isCompleted: boolean;
  $id: string;
  $createdAt: string;
}

export type TodoItemsList = {
  [itemId: string]: TodoItem
}

export type TitleType = "toComplete" | "completed";

export type ErrorMessageProps = {
  message: string;
};

export type AuthProviderProps = {
  children: JSX.Element;
  isAuth: boolean | null;
}

export type TodoItemProps = {
  todo: string,
  createdAt: string;
  isCompleted: boolean;
  id: string;
}

export type LoaderProps = {
  message: string;
  loaderWidth?: number;
  loaderHeight?: number;
}

export interface authState {
  isAuthorized: boolean | null;
  isLoading: boolean;
  email: string | null;
}


export interface todoState {
  todosList: TodoItemsList | null;
  isLoading: boolean;
  toComplete: number;
  completed: number
}

export interface loadingState {
  isLoading: boolean;
}

