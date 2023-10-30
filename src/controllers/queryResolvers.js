import mongoose from "mongoose";
import { validateEmail } from "../utils/stringValidators.js";
import { hashPassword, decryptPassword } from "../controllers/bcrypt.js";
import { verifyToken, tokenise } from "../controllers/jwt.js";
import { GraphQLError } from "graphql";
import { userSchema } from "../models/user.js";
import { imageSchema } from '../models/image.js';
import { textSchema } from '../models/text.js';
import { projectSchema } from '../models/project.js';
import { parcelSchema } from '../models/parcel.js';
import { orderSchema } from '../models/order.js';

const User = mongoose.model('User', userSchema);
const Project = mongoose.model('Project', projectSchema);
const Parcel = mongoose.model('Parcel', parcelSchema);
const Text = mongoose.model('Text', textSchema);
const Image = mongoose.model('Image', imageSchema);
const Order = mongoose.model('Order', orderSchema);

/** QUERY RESOLVERS */

/**
 * Resolves users query
 * @returns A list of Users Objects from Database
 */
export async function getAllUsers() {
    try {
      const result = await User.find({});
      console.log(result); /** This should be replaced with a custom logger */
      return result;

    } catch (error) {
      console.error(error); /** This should be replaced with a custom logger */
      throw error;
    }
}

/**
 * Resolves orders query
 * @returns Alist of Order objects from database
 */
export async function getAllOrders() {
  try {
    const result = await Order.find({});
    return result;

  } catch (error) {
    console.error(error); /** This should be replaced with a custom logger */
    throw error;
  }
}

/**
 * Resolves parcels query
 * @returns A list of all parcels from database
 */
export async function getAllParcels() {
  try {
    const result = await Parcel.find({});
    return result;

  } catch(error){
    console.error(error);
    throw error;
  }
}

/**
 * Resolves the projects query
 * @returns A list of all pprojects in database
 */
export async function getAllProjects() {
  try{
    const result = Project.find({});
    return result;

  } catch(error) {
    console.error(error);
    throw error;
  }
}

/**
 * Resolves images query
 * @returns A list of image objects from database
 */
export async function getAllImages() {
  try {
    const result = await Image.find({});
    return result;
  } catch(error) {
    console.error(error);
    throw error;
  }
}

/**
 * Resolves texts query
 * @returns A list of text objects from database
 */
export async function getAllTexts() {
  try{
    const result = Text.find({});
    return result;

  } catch(error) {
    console.error(error);
    throw error();
  }
}
/** MUTATION RESOLVERS */

/**
 * Resolves the signup mutation by adding a new user to database
 * @param {Object} args Form fields required for signup
 * @returns a success message containing the new users details
 */
export async function signUp (args) {
  try{
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
  } catch(error){
    console.error(error);
    throw error;
  }
}

/**
 * 
 * @param {Object} args form fields required for login
 * @returns 
 */
export async function logIn (args) {
  try {
    /** find a user associated with email */
    const user = await User.findOne({email: args.email});
    if(!user && user === null) {
      throw new GraphQLError(`User: ${args.email} is not available!`);
    }

    if(await decryptPassword(args.password, user.password)) {
      const token = await tokenise({
        fullname: user.fullname,
        email: user.email,
        userID: user.id,
      });

      console.log(user.id);

      return {
        token,
        user,
      };
    }
  } catch(error){
    console.error(error);
    throw error;
  }
}