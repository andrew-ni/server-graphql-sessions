import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar GraphQLDateTime

  type User {
    id: ID!
    email: String!
  }

  type Post {
    id: ID!
    user_id: String!
    body: String!
    created_at: GraphQLDateTime!
  }

  type Query {
    me: User
    post(id: ID!): Post
  }

  type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): User
    addPost(body: String!): Post
  }
`;
