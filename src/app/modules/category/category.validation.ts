import { z } from "zod";

export const createCategoryValidationSchema = z.object(
    {
        body: z.object({
            title: z.string().min(2, { message: "Must be 5 or more characters long" }).max(50, { message: 'Must be 20 or end charactes long' }),
            slug: z
                .string()
                .min(2, { message: "Slug must be 2 or more characters long" })
                .max(50, { message: "Slug must be 50 or fewer characters long" })
                .regex(/^[a-z]+(-[a-z]+)*$/, {
                    message:
                        "Slug must be in the format 'the-desired-format-for', with lowercase letters and hyphens only, no spaces or special characters.",
                }),
            isBlocked: z.boolean().default(false)
        })
    }
)
export const updateCategoryValidationSchema = z.object(
    {
        body: z.object({
            title: z.string().min(2, { message: "Must be 5 or more characters long" }).max(50, { message: 'Must be 20 or end charactes long' }).optional(),
            slug: z
                .string()
                .min(2, { message: "Slug must be 2 or more characters long" })
                .max(50, { message: "Slug must be 50 or fewer characters long" })
                .regex(/^[a-z]+(-[a-z]+)*$/, {
                    message:
                        "Slug must be in the format 'the-desired-format-for', with lowercase letters and hyphens only, no spaces or special characters.",
                }).optional(),
            isBlocked: z.boolean().default(false)
        })
    }
)
