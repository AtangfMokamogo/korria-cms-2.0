import mongoose from "mongoose";

const { Schema } = mongoose;

export const textSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    payload: {
        type: String,
        required: [true, 'Text type has no payload'],
    },

    project: {
        type: String,
        ref: 'Project',
        required: true,
    },

    tags: {
        type: [String],
    },

    order: {
        type: String,
        ref: 'Order',
    },

    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User stated in text type does not exist'],
    },

    createdon: {
        type: Date,
        default: Date.now
    }

})