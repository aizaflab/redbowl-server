import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";
const blogSchema = new Schema<TBlog>({
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
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    isPublished: {
        type: Boolean,
        require: true,
        default: true,

    },
}, { timestamps: true });

export const BlogModel = model<TBlog>('Blog', blogSchema)
