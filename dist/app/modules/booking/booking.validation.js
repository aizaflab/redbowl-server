"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingValidationSchema = void 0;
const zod_1 = require("zod");
exports.createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.object({
            name: zod_1.z
                .string()
                .min(2, { message: "Name must be 2 or more characters long" }),
            email: zod_1.z
                .string()
                .email({ message: "Invalid email address" }),
            phone: zod_1.z
                .string()
                .regex(/^[\d\s\-()+]+$/, { message: "Invalid phone number format" }),
        }),
        room: zod_1.z
            .string()
            .regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid room ID" }),
        city: zod_1.z
            .string()
            .min(2, { message: "City must be 2 or more characters long" }),
        guests: zod_1.z
            .number()
            .min(1, { message: "Guests must be at least 1" }),
        startDate: zod_1.z
            .string()
            .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid start date" }),
        endDate: zod_1.z
            .string()
            .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid end date" }),
        totalPrice: zod_1.z
            .number()
            .min(0, { message: "Total price must be a non-negative number" }),
        status: zod_1.z
            .string()
            .optional()
            .default("pending")
            .refine((val) => ["pending", "confirmed", "cancelled"].includes(val), {
            message: "Invalid status",
        }),
        payment_info: zod_1.z
            .object({
            type: zod_1.z.string().optional(),
            transactionId: zod_1.z.string().optional(),
            paid: zod_1.z.boolean().optional(),
        })
            .optional(),
    }),
});
