"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
    },
    sub_title: {
        type: String,
        require: true,
    },
    banner: {
        image: {
            type: String,
        },
        title: {
            type: String,
        },
    },
    seoContent: {
        metaTitle: {
            type: String,
        },
        metaDescription: {
            type: String,
        },
    },
    slug: {
        type: String,
        require: true,
        unique: true,
    },
    content: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    isPublished: {
        type: Boolean,
        require: true,
        default: true,
    },
}, { timestamps: true });
exports.BlogModel = (0, mongoose_1.model)('Blog', blogSchema);
