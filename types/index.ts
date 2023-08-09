import { User, Session } from 'next-auth';

export type FormState = {
  title: string;
  content: string;
  recipe: string;
  description: string;
  image: string;
  rating: number;
  category: string;
};

export interface ICocktail {
  id: string;
  title: string;
  content: string;
  recipe: string;
  description: string;
  image: string;
  rating: number;
  category: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  cocktails: {
    edges: { node: ICocktail }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
}

export interface ISession extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export interface ProjectForm {
  title: string;
  content: string;
  recipe: string;
  description: string;
  image: string;
  category: string;
}
