import mongoose from "mongoose";
import { imageSchema } from './image.js'
import { textSchema } from './text.js'
import { orderSchema } from './order.js'

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

    images: {
        type: [imageSchema],
        default: [],
    },

    texts: {
        type: [textSchema],
        default: [],
    },

    order: {
        type: [orderSchema],
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