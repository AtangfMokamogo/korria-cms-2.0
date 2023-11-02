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

function transformImages(images) {
  return images.map((image) => {
    const transformedImage = {
      type: image.type,
      fields: transformImageFields(image.fields),
      uploadedon: image.uploadedon,
    };

    return transformedImage;
  });
}

function transformImageFields(fields) {
  return fields.map((imageField) => ({
    title: imageField.title,
    src: imageField.src,
    alt: imageField.alt,
    copyright: imageField.copyright,
    order: imageField.order,
    tags: imageField.tags,
  }));
}

function transformTexts(texts) {
  return texts.map((text) => {
    const transformedText = {
      type: text.type,
      fields: {
        title: text.fields.title,
        payload: text.fields.payload,
        tags: text.fields.tags,
        order: text.fields.order,
      },
      createdon: text.createdon,
    };

    return transformedText;
  });
}
function transformToGraphQLFormat(field) {
  console.log("Parcels received for transformation:", field);

  const transformedParcels = field.map((parcel) => {
    const transformedParcel = {
      _id: parcel._id,
      title: parcel.title,
      project: parcel.project,
      tags: parcel.tags,
      order: parcel.order,
      createdby: parcel.createdby,
      createdon: parcel.createdon,
    };

    transformedParcel.images = transformImages(parcel.images);
    transformedParcel.texts = transformTexts(parcel.texts);

    return transformedParcel;
  });

  console.log("Transformed Parcels:", transformedParcels);

  const transformedImages = transformedParcels.flatMap((parcel) => parcel.images);
  const transformedTexts = transformedParcels.flatMap((parcel) => parcel.texts);

  console.log("Transformed Images:", transformedImages);
  console.log("Transformed Texts:", transformedTexts);

  return {
    parcels: transformedParcels,
    images: transformedImages,
    texts: transformedTexts,
  };
}

/**
 * Resolves parcels query
 * @returns A list of all parcels from the database
 */
export async function getParcels(args) {
  try {
    const projectTitle = args.filterBy.project.title;
    console.log("Project Title:", projectTitle); // Check if projectTitle is defined
    const parcels = await Parcel.find({ project: projectTitle });
    // In your GraphQL resolver or query
    console.log(parcels)
    const transformedData = transformToGraphQLFormat(parcels);
    console.log(transformedData);
    return [transformedData];    
  } catch(error){
    console.error.apply(error);
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

    const newParcel = new Parcel({
        title: parcelData.input.title,
        project: parcelData.input.project.title,
        images: images,
        texts: texts,
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
        contentID: data.id,
        type: "Parcel",
        date: userFriendlyDateTimeString,
    } 

  } catch(error) {
    console.error(error);
  }
}