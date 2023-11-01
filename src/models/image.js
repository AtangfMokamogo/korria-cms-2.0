import mongoose from "mongoose";

const { Schema } = mongoose;

export const imageSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    src: {
        type: String,
        required: true,
    },

    alt: {
        type: String,
        required: true,
    },

    copyright: {
        type: String,
        required: true,
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'image cant be found in stated project'],
    },

    order: {
        type: [String],
        default: []
    },

    tags: {
        type: [String],
        default: [],
    },

    uploadedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    uploadedon: {
        type: Date,
        default: Date.now
    }
});
