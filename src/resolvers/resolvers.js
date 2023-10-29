import mongoose from "mongoose";
import { GraphQLError } from "graphql";
import { userSchema } from "../models/user.js";
import { validateEmail } from "../utils/stringValidators.js";
import { hashPassword, decryptPassword } from "../controllers/bcrypt.js";
import { verifyToken, tokenise } from "../controllers/jwt.js";

const User = mongoose.model('User', userSchema);
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

/** Query Resolvers */
  Query: {
    books: () => books,
    users: async () => {
      const user = await User.find({});
      console.log(user);
      return user;
    },
    clientByEmail: async (root, args) => {
      const user = await User.findOne({email: args.email});
      if(!user) {
        throw new GraphQLError('User: ${args.email} is not available!');
      }
      return user;
    },
  },
/** End Query Resolvers */


/** Query Mutations Resolvers*/

  /** New User Sign Up Mutations */
  Mutation: {
    signup: async (root, args) => {
      try {
        if(validateEmail(args.email)) {
          const user = new User({
            fullname: args.fullname,
            email: args.email,
            password: await hashPassword(args.password),
          });
    
          const result = await user.save();
          console.log(result);
          return result;
        } else {
          throw new Error('Invalid email address format');
        }

      } catch (error) {
        if (error.code === 11000) {
          console.error(error);
        }
        return error;
      }
    },
    login: async (root, args, context) => {

      /** find a user associated with email */
      const user = await User.findOne({email: args.email});
      if(!user && user === null) {
        throw new GraphQLError(`User: ${args.email} is not available!`);
      }


      /** decode thier password if the user is present */
      /** retrieve their last login */
      /** if all positive generate a new jwt and return it to user */
      if(await decryptPassword(args.password, user.password)) {
        const token = await tokenise({
          fullname: user.fullname,
          email: user.email,
        });

        return {
          token,
          user,
        };
      }
    }
  },
/** End Query Mutation Reslovers */
};