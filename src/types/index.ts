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

export type ErrorMessageProps = {
  message: string;
};
