import { z } from 'zod'
export const createBlogValidationSchema = z.object(
    {
        body: z.object({
            title: z.string().min(5, { message: "Must be 5 or more characters long" }),
            sub_title: z.string().min(2, { message: "Must be 5 or more characters long" }),
            category: z.string(),
            slug: z
                .string()
                .min(2, { message: "Slug must be 2 or more characters long" })
                .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
                    message:
                        "Slug must be in the format 'the-desired-format-for', with lowercase letters and hyphens only, no spaces or special characters."
                }),
            content: z.string().min(10, { message: "Must be 10 or more characters long" }),
            isPublished: z.boolean().default(true)
        })
    }
)
export const updateBlogValidationSchema = z.object(
    {
        body: z.object({
            title: z.string().min(5, { message: "Must be 5 or more characters long" }).optional(),
            sub_title: z.string().min(2, { message: "Must be 5 or more characters long" }).optional(),
            category: z.string().optional(),
            slug: z
                .string()
                .min(2, { message: "Slug must be 2 or more characters long" })
                .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
                    message:
                        "Slug must be in the format 'the-desired-format-for', with lowercase letters and hyphens only, no spaces or special characters.",
                }).optional(),
            content: z.string().min(10, { message: "Must be 10 or more characters long" }).optional(),
            isPublished: z.boolean().default(true).optional()
        })
    }
)
