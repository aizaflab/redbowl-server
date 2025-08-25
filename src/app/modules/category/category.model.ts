import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";
const categorySchema = new Schema<TCategory>({
    title: {
        type: String,
        require: true,
    },
    slug: {
        type: String,
        require: true,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    isBlocked: {
        type: Boolean,
        require: false,
        default: false
    }
}, { timestamps: true });


export const CategoryModel = model<TCategory>('Category', categorySchema)