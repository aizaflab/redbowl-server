import { z } from "zod";

export const createBookingValidationSchema = z.object({
    body: z.object({
      user: z.object({
        name: z
          .string()
          .min(2, { message: "Name must be 2 or more characters long" }),
        email: z
          .string()
          .email({ message: "Invalid email address" }),
        phone: z
          .string()
          .regex(/^[\d\s\-()+]+$/, { message: "Invalid phone number format" }),
      }),
      room: z
        .string()
        .regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid room ID" }),
      city: z
        .string()
        .min(2, { message: "City must be 2 or more characters long" }),
      guests: z
        .number()
        .min(1, { message: "Guests must be at least 1" }),
      startDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid start date" }),
      endDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), { message: "Invalid end date" }),
      totalPrice: z
        .number()
        .min(0, { message: "Total price must be a non-negative number" }),
      status: z
        .string()
        .optional()
        .default("pending")
        .refine((val) => ["pending", "confirmed", "cancelled"].includes(val), {
          message: "Invalid status",
        }),
      payment_info: z
        .object({
          type: z.string().optional(),
          transactionId: z.string().optional(),
          paid: z.boolean().optional(),
        })
        .optional(),
    }),
  });
  