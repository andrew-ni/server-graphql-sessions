import * as bcrypt from 'bcryptjs';
import { IResolvers } from 'graphql-tools';
import { Post } from './entity/Post';
import { User } from './entity/User';

export const resolvers: IResolvers = {
  Query: {
    me: (_, __, { req }) => {
      if (!req.session.userId) throw new Error('Not logged in');
      return User.findOne(req.session.userId);
    },
    post: (_, { id }) => {
      return Post.findOne(id);
    },
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (user) throw new Error('Email is already in use');

      const hashedPassword = await bcrypt.hash(password, 10);
      return await User.create({
        email,
        password: hashedPassword,
      }).save();
    },
    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error('Invalid login');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid login');

      req.session.userId = user.id;

      return user;
    },
    addPost: async (_, { body }, { req }) => {
      if (!req.session.userId) throw new Error('Not logged in');
      return await Post.create({
        body,
        created_at: new Date(),
        user_id: req.session.userId,
      }).save();
    },
  },
};
