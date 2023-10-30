import mongoose from "mongoose";

const { Schema } = mongoose;

export const orderSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title for Order missing'],
    },

    project: {
        type: String,
        ref: 'Project',
        required: [true, 'Project defined by Order does not exist']
    },

    tags: {
        type: [String],
    },

    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User for Order not defined'],
    },

    createdon: {
        type: Date,
        default: Date.now,
    },
});