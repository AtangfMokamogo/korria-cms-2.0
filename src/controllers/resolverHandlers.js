import mongoose from "mongoose";
import { validateEmail } from "../utils/stringValidators.js";
import { hashPassword, decryptPassword } from "./bcrypt.js";
import { verifyToken, tokenise } from "./jwt.js";
import { GraphQLError } from "graphql";
import { userSchema } from "../models/user.js";
import { imageSchema } from '../models/image.js';
import { textSchema } from '../models/text.js';
import { projectSchema } from '../models/project.js';
import { parcelSchema } from '../models/parcel.js';

const User = mongoose.model('User', userSchema);
const Project = mongoose.model('Project', projectSchema);
const Parcel = mongoose.model('Parcel', parcelSchema);
const Text = mongoose.model('Text', textSchema);
const Image = mongoose.model('Image', imageSchema);

/** QUERY RESOLVERS */

/**
 * Resolves users query
 * @returns A list of Users Objects from Database
 */
export async function getUser(userID) {
    try {
      const result = await User.findById(userID);
      console.log(result); /** This should be replaced with a custom logger */
      
      const user = {
        id: result._id.toString(),
        fullname: result.fullname,
        email: result.email,
        password: result.password
      }

      return user;

    } catch (error) {
      console.error(error); /** This should be replaced with a custom logger */
      throw error;
    }
}

/**
 * Resolves parcels query
 * @returns A list of all parcels from the database
 */
export async function getParcels(args) {
  try {
    // Check if args.project is present and not "null"
    const filter = args.project && args.project !== "null" ? { project: args.project } : {};

    const result = await Parcel.find(filter)
      .populate('createdby')
      .populate('texts')
      .populate('images')
      .populate('project');

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Resolves projects query
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
export async function getTexts(filter) {
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
 * Resolves signup mutation by adding a new user to database
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
 * resolves logIn mutation by generating a new token for user
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
        userID: user.id.toString(),
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

/**
 * resolves createText mutation by adding a new text object to database
 * @param {Object} textData A object with required fields for createing a Text type
 * @param {String} userID A unique identifier for each User
 * @returns Success message if new text content has been succesfully created
 */
export async function createText(textData, userID) {
  try{
    const newText = new Text({
      title: textData.textData.title,
      payload: textData.textData.payload,
      project: textData.textData.project.title,
      order: Object.prototype.hasOwnProperty.call(textData.textData, 'order') ? textData.textData.order : [`${textData.textData.project.title}`],
      tags: Object.prototype.hasOwnProperty.call(textData.textData, 'tags') ? textData.textData.tags : [`${textData.textData.project.title}`],
      createdby: userID
    })
    const data = await newText.save();
    return {
      message: "Successfully added Content",
      contentID: data.id.toString(),
      type: "Text",
      date: Date.now,
    }    
  } catch(error){
    console.error(error);
    throw error;
  }
}


/**
 * resolves createProject mutation by adding a new project to database
 * @param {Object} projectData an object containing required fields for project creation
 * @param {String} userID a unique identifier for the user
 * @returns A success message if project has been created succesfully
 */
export async function createProject(projectData, userID) {
  try{
    const newProject = new Project({
      title: projectData.projectData.title,
      tags: Object.prototype.hasOwnProperty.call(projectData.projectData, 'tags') ? projectData.projectData.tags : [`${projectData.projectData.title}`],
      createdby: userID
    })
    const data = await newProject.save();
    return {
      message: `A new project ${projectData.projectData.title} has been created!`,
      contentID: data.id.toString(),
      type: "Project",
      date: Date.now,
    }    
  } catch(error){
    console.error(error);
    throw error;
  }
}

/**
 * resolves createParcel mutation by adding a new parcel to database
 * @param {Object} parcelData An object contatining required fields for parcel creation
 * @param {String} userID A unique identifier for the user
 */
export async function createParcel(parcelData, userID) {
  try{
    const { images, texts } = parcelData.input;

    const imagePromises = images.map(async (image) => {
      const newImage = new Image({
        title: image.title,
        src: image.src,
        alt: image.alt,
        project: image.project.title,
        copyright: image.copyright,
        uploadedby: userID,
        orders: Object.hasOwnProperty.call(image, 'order') ? image.order : [`${image.project.title}`],
        tags: Object.hasOwnProperty.call(image, 'tags') ? image.tags : [`${image.project.title}`]
      });

      return await newImage.save();
    });

    const textPromises = texts.map(async (text) => {
      const newText = new Text({
        title: text.title,
        payload: text.payload,
        project: text.project.title,
        copyright: text.copyright,
        createdby: userID,
        orders: Object.hasOwnProperty.call(text, 'order') ? text.order : [`${text.project.title}`],
        tags: Object.hasOwnProperty.call(text, 'tags') ? text.tags : [`${text.project.title}`]
      });

      return await newText.save();
    });

    const [imagesData, textsData] = await Promise.all([Promise.all(imagePromises), Promise.all(textPromises)]);

    const imageTitles = imagesData.map(data => data.title);
    const textTitles = textsData.map(data => data.title);
    // save the parcel to database

    const newParcel = new Parcel({
        title: parcelData.input.title,
        project: parcelData.input.project.title,
        images: imageTitles,
        texts: textTitles,
        orders: Object.hasOwnProperty.call(parcelData.input, 'order') ? parcelData.input.order : [`${parcelData.input.title}`],
        tags: Object.hasOwnProperty.call(parcelData.input, 'tags') ? parcelData.input.tags : [`${parcelData.input.title}`],
        createdby: userID,
    });

    const data = await newParcel.save();

    const date = new Date(data.createdon);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const userFriendlyDateTimeString = date.toLocaleString('en-US', options);

    return {
        message: `A new parcel ${parcelData.input.title} has been created!`,
        contentID: data._id.toString(),
        type: "Parcel",
        date: userFriendlyDateTimeString,
    } 

  } catch(error) {
    console.error(error);
  }
}