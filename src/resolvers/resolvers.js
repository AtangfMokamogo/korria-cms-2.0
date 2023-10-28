import mongoose from "mongoose";
import { userSchema } from "../models/user.js";
import { hashPassword, decryptPassword } from "../controllers/bcrypt.js";

const User = mongoose.model('User', userSchema);
/* eslint-disable import/prefer-default-export */
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
export const resolvers = {
  Query: {
    books: () => books,
    users: async () => {
      const user = await User.find({});

      return user;
    },
  },
  Mutation: {
    addUser: async (root, args) => {
      try {
        const user = new User({
          fullname: args.fullname,
          email: args.email,
          password: await hashPassword(args.password),
        });
  
        const result = await user.save();
        console.log(result);
        return result;
      } catch (error) {
        if (error.code === 11000) {
          console.error(error);
        }
      }
    },
  },
};
