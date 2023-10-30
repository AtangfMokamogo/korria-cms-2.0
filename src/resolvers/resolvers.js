import mongoose from "mongoose";
import { 
  getAllUsers,
  getAllParcels,
  getAllOrders,
  getAllImages,
  getAllTexts,
  getAllProjects,
  signUp,
  logIn,
} from "../controllers/queryResolvers.js";

export const resolvers = {

/** Query Resolvers */
  Query: {
    users: async ()=> {
      const users = await getAllUsers();
      return users
    },

    orders: async () => {
      const orders = await getAllOrders();
      return orders
    },

    parcels: async () => {
      const parcels = await getAllParcels();
      return parcels;
    },

    projects: async () => {
      const projects = await getAllProjects();
      return projects;
    },

    images: async () => {
      const images = await getAllImages();
      return images;
    },

    texts: async () => {
      return await getAllTexts();
    },

    ordersByID: (root, args) => {
      const orders = [
        {
          id: "001",
          title: "Blog Order",
          createdby: {
            email: "my email",
            fullname: "my name",
            password: "my pass",
          },
          createdon: "Today",
          tags: ["blog", "test"],
        },
        {
          id: "002",
          title: "Blog Order",
          createdby: {
            email: "my email",
            fullname: "my name",
            password: "my pass",
          },
          createdon: "Today",
          tags: ["blog", "test"],
        }   
      ];

      let foundOrder = null;

      orders.forEach((order) => {
        if (order.id === args.orderID) {
          foundOrder = order;
        }
      });
    
      return foundOrder;
    }
  },
/** End Query Resolvers */


/** Mutations Resolvers*/
  Mutation: {
    signUp: async (root, args) => {
        const result = await signUp(args);
        return result
      },

    logIn: async (root, args) => {
      const result = await logIn(args);
      return result
    }
  },
/** End Query Mutation Resolvers */
};