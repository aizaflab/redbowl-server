"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCityValidationSchema = void 0;
const zod_1 = require("zod");
exports.createCityValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(2, { message: "City name must be 2 or more characters long" })
            .regex(/^[a-z\s]+$/i, {
            message: "City name must contain only letters and spaces",
        }),
        tax: zod_1.z
            .number()
            .min(0, { message: "Tax must be a non-negative number" }),
    }),
});
