import { GraphQLClient } from 'graphql-request';
import { CocktailForm } from '@/types';

import {
  createCocktailMutation,
  createUserMutation,
  deleteCocktailMutation,
  updateCocktailMutation,
  getCocktailByIdQuery,
  getCocktailsOfUserQuery,
  getUserQuery,
  cocktailsQuery,
} from '@/graphql';

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ''
  : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ''
  : 'averysecretkey';
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: 'POST',
      body: JSON.stringify({
        path: imagePath,
      }),
    });
    return response.json();
  } catch (err) {
    throw err;
  }
};

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};

export const fetchAllCocktails = async (endcursor?: string | null) => {
  client.setHeader('x-api-key', apiKey);

  return makeGraphQLRequest(cocktailsQuery, { endcursor });
};

export const createCocktail = async (
  form: CocktailForm,
  creatorId: string,
  token: string
) => {
  client.setHeader('Authorization', `Bearer ${token}`);
  const variables = {
    input: {
      ...form,
      rating: Number(form.rating),
      createdBy: {
        link: creatorId,
      },
    },
  };

  return makeGraphQLRequest(createCocktailMutation, variables);
};

export const updateCocktail = async (
  form: CocktailForm,
  cocktailId: string,
  token: string
) => {
  client.setHeader('Authorization', `Bearer ${token}`);

  const variables = {
    id: cocktailId,
    input: {
      ...form
    },
  };

  return makeGraphQLRequest(updateCocktailMutation, variables);
};

export const deleteCocktail = (id: string, token: string) => {
  client.setHeader('Authorization', `Bearer ${token}`);
  return makeGraphQLRequest(deleteCocktailMutation, { id });
};

export const getCocktailDetails = (id: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getCocktailByIdQuery, { id });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader('x-api-key', apiKey);

  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl,
    },
  };

  return makeGraphQLRequest(createUserMutation, variables);
};

export const getUserProjects = (id: string, last?: number) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getCocktailsOfUserQuery, { id, last });
};

export const getUser = (email: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};
