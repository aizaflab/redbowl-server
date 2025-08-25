"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryValidationSchema = exports.createCategoryValidationSchema = void 0;
const zod_1 = require("zod");
exports.createCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(2, { message: "Must be 5 or more characters long" }).max(50, { message: 'Must be 20 or end charactes long' }),
        slug: zod_1.z
            .string()
            .min(2, { message: "Slug must be 2 or more characters long" })
            .max(50, { message: "Slug must be 50 or fewer characters long" })
            .regex(/^[a-z]+(-[a-z]+)*$/, {
            message: "Slug must be in the format 'the-desired-format-for', with lowercase letters and hyphens only, no spaces or special characters.",
        }),
        isBlocked: zod_1.z.boolean().default(false)
    })
});
exports.updateCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(2, { message: "Must be 5 or more characters long" }).max(50, { message: 'Must be 20 or end charactes long' }).optional(),
        slug: zod_1.z
            .string()
            .min(2, { message: "Slug must be 2 or more characters long" })
            .max(50, { message: "Slug must be 50 or fewer characters long" })
            .regex(/^[a-z]+(-[a-z]+)*$/, {
            message: "Slug must be in the format 'the-desired-format-for', with lowercase letters and hyphens only, no spaces or special characters.",
        }).optional(),
        isBlocked: zod_1.z.boolean().default(false)
    })
});
