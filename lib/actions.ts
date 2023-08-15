import { GraphQLClient } from 'graphql-request';
import { CocktailForm } from '@/types';
import { categoryFilters } from '@/constants';
import {
  createCocktailMutation,
  createUserMutation,
  deleteCocktailMutation,
  updateCocktailMutation,
  updateCocktailRatingMutation,
  getCocktailByIdQuery,
  getUserQuery,
  cocktailsQuery,
  getCocktailsOfUserQuery,
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

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};

export const fetchAllCocktails = async (
  category?: string | null,
  endcursor?: string | null
) => {
  client.setHeader('x-api-key', apiKey);

  const categories = category == null ? categoryFilters : [category];

  return makeGraphQLRequest(cocktailsQuery, { categories, endcursor });
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
      ...form,
      rating: form.rating.toString(),
    },
  };

  return makeGraphQLRequest(updateCocktailMutation, variables);
};

export const updateCocktailRating = async (
  rating: number,
  cocktailId: string,
  token: string
) => {
  client.setHeader('Authorization', `Bearer ${token}`);

  const variables = {
    id: cocktailId,
    input: {
      rating: rating.toString(),
    },
  };

  return makeGraphQLRequest(updateCocktailRatingMutation, variables);
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

export const getUserCocktails = (id: string, last?: number) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getCocktailsOfUserQuery, { id, last });
};

export const getUser = (email: string) => {
  client.setHeader('x-api-key', apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};
