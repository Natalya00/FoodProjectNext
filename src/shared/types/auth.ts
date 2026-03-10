export type AuthResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    documentId?: string;
  };
};

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export type LoginData = {
  identifier: string;
  password: string;
};

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  documentId?: string;
};

