import mongoose from "mongoose";

const { Schema } = mongoose;

const TextFields = new Schema({
    title: {
        type: String,
        required: true,
    },

    payload: {
        type: String,
        required: [true, 'Text type has no payload'],
    },

    tags: {
        type: [String],
        default: []
    },

    order: {
        type: [String],
        default: []
    },
})

export const textSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    
    fields: {
        type: TextFields,
        required: true,
    },

    createdon: {
        type: Date,
        default: Date.now
    }

})