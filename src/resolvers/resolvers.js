import { GraphQLError } from "graphql";
import { verifyToken} from "../controllers/jwt.js";
import { 
  getUser,
  getParcels,
  getAllImages,
  getTexts,
  getAllProjects,
  signUp,
  logIn,
  createText,
  createProject,
  createParcel
} from "../controllers/resolverHandlers.js";


export const resolvers = {

/** Query Resolvers */
  Query: {
    users: async (root, args)=> {
      if(!args.id){
        throw new GraphQLError('User ID not found in query!')
      }
      const users = await getUser(args.id);
      return users
    },

    parcels: async (root, args, context) => {
      if(!context.token){
        throw new GraphQLError('Token not found! Please log in to complete Query');
      }
      if (await verifyToken(context.token)){
        const queryStatus = await getParcels(args);
        return queryStatus;   
      }
    },

    projects: async () => {
      const projects = await getAllProjects();
      return projects;
    },

    images: async (root, args, context) => {
      const images = await getAllImages();
      console.log(context);
      return images;
    },

    texts: async (root, args) => {
      return await getTexts(args);
    },
  },
/** End Query Resolvers */


/** Mutations Resolvers*/
  Mutation: {
    /** User Creation */
    signUp: async (root, args) => {
        const result = await signUp(args);
        return result;
      },

    
    logIn: async (root, args) => {
      const result = await logIn(args);
      return result;
    },
    
    /** Project Creation */
    createProject: async (root, args, context) => {
      if(!context.token){
        throw new GraphQLError('Token not found! Please log in to complete Query');
      }
      const {
        userID
      } = await verifyToken(context.token);
      const queryStatus = await createProject(args, userID);
      return queryStatus;      
    },
    /** Content Definition */

    createText: async (root, args, context) => {
      if(!context.token){
        throw new GraphQLError('Token not found! Please log in to complete Query');
      }
      const {
        userID
      } = await verifyToken(context.token);
      const queryStatus = await createText(args, userID);
      return queryStatus;
    },

    createParcel: async (root, args, context) => {
      if(!context.token){
        throw new GraphQLError('Token not found! Please log in to complete Query');
      }
      const {
        userID
      } = await verifyToken(context.token);
      const queryStatus = await createParcel(args, userID);
      return queryStatus;
    }
  },
/** End Query Mutation Resolvers */
};