"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogValidationSchema = exports.createBlogValidationSchema = void 0;
const zod_1 = require("zod");
exports.createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(5, { message: "Must be 5 or more characters long" }),
        sub_title: zod_1.z.string().min(2, { message: "Must be 5 or more characters long" }),
        category: zod_1.z.string(),
        slug: zod_1.z
            .string()
            .min(2, { message: "Slug must be 2 or more characters long" })
            .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
            message: "Slug must be in the format 'the-desired-format-for', with lowercase letters and hyphens only, no spaces or special characters."
        }),
        content: zod_1.z.string().min(10, { message: "Must be 10 or more characters long" }),
        isPublished: zod_1.z.boolean().default(true)
    })
});
exports.updateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(5, { message: "Must be 5 or more characters long" }).optional(),
        sub_title: zod_1.z.string().min(2, { message: "Must be 5 or more characters long" }).optional(),
        category: zod_1.z.string().optional(),
        slug: zod_1.z
            .string()
            .min(2, { message: "Slug must be 2 or more characters long" })
            .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
            message: "Slug must be in the format 'the-desired-format-for', with lowercase letters and hyphens only, no spaces or special characters.",
        }).optional(),
        content: zod_1.z.string().min(10, { message: "Must be 10 or more characters long" }).optional(),
        isPublished: zod_1.z.boolean().default(true).optional()
    })
});
