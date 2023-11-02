import mongoose from "mongoose";

const { Schema } = mongoose;

const imageFields = new Schema({
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

    order: {
        type: [String],
        default: []
    },

    tags: {
        type: [String],
        default: [],
    },
});

export const imageSchema = new Schema({
    type: {
        type: String,
        required: true,
    },

    fields: {
        type: [imageFields],
        required: true,
    },

    uploadedon: {
        type: Date,
        default: Date.now
    }
});
