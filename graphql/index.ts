export const createCocktailMutation = `
	mutation CreateCocktail($input: CocktailCreateInput!) {
		cocktailCreate(input: $input) {
			cocktail {
				id
				title
        content
        recipe
        rating
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const updateCocktailMutation = `
	mutation UpdateCocktail($id: ID!, $input: CocktailUpdateInput!) {
		cocktailUpdate(by: { id: $id }, input: $input) {
			cocktail {
				id
				title
        content
        recipe
        rating
				description
        category
				createdBy {
					email
					name
				}
			}
		}
	}
`;
export const updateCocktailRatingMutation = `
	mutation UpdateCocktail($id: ID!, $input: CocktailUpdateInput!) {
		cocktailUpdate(by: { id: $id }, input: $input) {
			cocktail {
				id
				title
        content
        recipe
        rating
				description
        category
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const deleteCocktailMutation = `
  mutation DeleteCocktail($id: ID!) {
    cocktailDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

export const createUserMutation = `
	mutation CreateUser($input: UserCreateInput!) {
		userCreate(input: $input) {
			user {
				name
				email
				avatarUrl
				id
			}
		}
	}
`;

export const cocktailsQuery = `
  query getCocktails($categories: [String!], $endcursor: String) {
    cocktailSearch(first: 6, after: $endcursor, filter:  {category: {in: $categories}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          title
          content
          rating
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export const getCocktailByIdQuery = `
  query GetCocktailById($id: ID!) {
    cocktail(by: { id: $id }) {
      id
      title
      content
      recipe
      rating
      description
      image
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email }) {
      id
      name
      email
      avatarUrl
    }
  }
`;
