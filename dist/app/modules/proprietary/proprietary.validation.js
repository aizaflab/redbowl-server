"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProprietaryValidationSchema = void 0;
const zod_1 = require("zod");
exports.createProprietaryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string()
            .min(3, { message: "Title must be 3 or more characters long" }),
        slug: zod_1.z
            .string()
            .min(2, { message: "Slug must be 2 or more characters long" })
            .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
            message: "Slug must use lowercase letters and hyphens only",
        }),
        internal_name: zod_1.z
            .string()
            .min(2, { message: "Internal name must be 2 or more characters long" }),
        cleaning_fee: zod_1.z
            .number()
            .min(0, { message: "Cleaning fee must be a non-negative number" }),
        sub_title: zod_1.z
            .string()
            .optional(),
        photo: zod_1.z
            .array(zod_1.z.object({
            path: zod_1.z.string().url({ message: "Path must be a valid URL" }),
            title: zod_1.z.string().optional(),
            details: zod_1.z.string().optional(),
        }))
            .optional(),
        amenities: zod_1.z
            .array(zod_1.z.object({
            id: zod_1.z.string().optional(),
            name: zod_1.z.string().optional(),
        }))
            .optional(),
        rating: zod_1.z.number().min(0).max(5).optional(),
        about: zod_1.z
            .string()
            .min(10, { message: "About must be 10 or more characters long" }),
        accommodation_overview: zod_1.z
            .string()
            .min(10, { message: "Accommodation overview must be 10 or more characters long" }),
        room_details: zod_1.z
            .object({
            bed_room: zod_1.z.string().optional(),
            total_bed: zod_1.z
                .number()
                .min(1, { message: "Total beds must be at least 1" }),
            bathroom: zod_1.z.string().optional(),
            max_guests: zod_1.z
                .number()
                .min(1, { message: "Maximum guests must be at least 1" })
                .optional(),
        })
            .optional(),
        status: zod_1.z.boolean().default(false),
        timeframe: zod_1.z.object({
            prices: zod_1.z.number().min(0, { message: "Price must be a non-negative number" }),
            period: zod_1.z.string().default("night"),
        }),
        location: zod_1.z.object({
            cityId: zod_1.z.string().regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid city ID" }),
            address: zod_1.z.string().optional(),
        }),
        total_booking: zod_1.z.number().default(0),
    }),
});
