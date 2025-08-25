import { Types } from "mongoose";

export type TBlog = {
    title: string;
    slug: string;
    sub_title: string;
    content: string;
    user: Types.ObjectId;
    category: Types.ObjectId;
    isPublished: boolean;
    banner?: {
        image: string;
        title: string;
    }; 
    seoContent?: {
        metaTitle: string;
        metaDescription: string;
    }; 
};
