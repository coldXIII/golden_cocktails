export const createCocktailMutation = `
	mutation CreateCocktail($input: CocktailCreateInput!) {
		CocktailCreate(input: $input) {
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
		CocktailUpdate(by: { id: $id }, input: $input) {
			Cocktail {
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

export const deleteCocktailMutation = `
  mutation DeleteCocktail($id: ID!) {
    CocktailDelete(by: { id: $id }) {
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
  query getCocktails($category: String, $endcursor: String) {
    CocktailSearch(first: 8, after: $endcursor, filter: {category: {eq: $category}}) {
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
    Cocktail(by: { id: $id }) {
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

export const getCocktailsOfUserQuery = `
  query getUserCocktails($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      avatarUrl
      Cocktails(last: $last) {
        edges {
          node {
            id
            title
            rating
            image
            category
          }
        }
      }
    }
  }
`;