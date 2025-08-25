import { z } from 'zod'

export const createUserValidationSchema = z.object(
    {
        body: z.object({
            name: z.string().min(2, { message: "Must be 5 or more characters long" }).max(20, { message: 'Must be 20 or end charactes long' }),
            email: z.string().email({ message: "Invalid email address" }),
            password: z.string().min(8, { message: "Password must be at least 8 characters long" })
                .regex(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    {
                        message:
                            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                    }
                ),
            role: z
                .enum(["admin", "user"], {
                    errorMap: () => ({
                        message: "Role must be either 'admin' or 'user'",
                    }),
                }).default('user'),
            isBlocked: z.boolean().default(false)
        })
    }
)
export const updateUserValidationSchema = z.object(
    {
        body: z.object({
            name: z.string().min(2, { message: "Must be 5 or more characters long" }).max(20, { message: 'Must be 20 or end charactes long' }).optional(),
            email: z.string().email({ message: "Invalid email address" }).optional(),
            password: z.string().min(8, { message: "Password must be at least 8 characters long" })
                .regex(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    {
                        message:
                            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                    }
                ).optional(),
            role: z
                .enum(["admin", "user"], {
                    errorMap: () => ({
                        message: "Role must be either 'admin' or 'user'",
                    }),
                }).default('user').optional(),
            isBlocked: z.boolean().default(false).optional()
        })
    }
)