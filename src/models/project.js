import mongoose from "mongoose";

const { Schema } = mongoose;

export const projectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Project title not defined'],
        unique: true
    },

    tags: {
        type: [String],
    },

    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User not defined for project'],
    },

    createdon: {
        type: Date,
        default: Date.now,
    },
});