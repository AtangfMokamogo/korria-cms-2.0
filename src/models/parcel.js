import mongoose from "mongoose";
import { imageSchema } from './image.js'
import { textSchema } from './text.js'

const{ Schema } = mongoose;

export const parcelSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Parcel type Requires a title'],
    },

    project: {
        type: String,
        ref: 'Project',
        required: [true, 'Parcel type requires a valid project']
    },

    tags: {
        type: [String],
    },

    images: [{
        type: [imageSchema],
        ref: 'Image',
    }],

    texts: [{
        type: [textSchema],
        ref: 'Text',
    }],

    order: {
        type: [String],
        default: [],
    },

    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Parcel has no define user'],
    },

    createdon: {
        type: Date,
        default: Date.now,
    },
});