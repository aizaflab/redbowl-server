import { z } from 'zod';
export const createProprietaryValidationSchema = z.object({
    body: z.object({
      title: z
        .string()
        .min(3, { message: "Title must be 3 or more characters long" }),
      slug: z
        .string()
        .min(2, { message: "Slug must be 2 or more characters long" })
        .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, {
          message: "Slug must use lowercase letters and hyphens only",
        }),
      internal_name: z
        .string()
        .min(2, { message: "Internal name must be 2 or more characters long" }),
      cleaning_fee: z
        .number()
        .min(0, { message: "Cleaning fee must be a non-negative number" }),
      sub_title: z
        .string()
        .optional(),
      photo: z
        .array(
          z.object({
            path: z.string().url({ message: "Path must be a valid URL" }),
            title: z.string().optional(),
            details: z.string().optional(),
          })
        )
        .optional(),
      amenities: z
        .array(
          z.object({
            id: z.string().optional(),
            name: z.string().optional(),
          })
        )
        .optional(),
      rating: z.number().min(0).max(5).optional(),
      about: z
        .string()
        .min(10, { message: "About must be 10 or more characters long" }),
      accommodation_overview: z
        .string()
        .min(10, { message: "Accommodation overview must be 10 or more characters long" }),
      room_details: z
        .object({
          bed_room: z.string().optional(),
          total_bed: z
            .number()
            .min(1, { message: "Total beds must be at least 1" }),
          bathroom: z.string().optional(),
          max_guests: z
            .number()
            .min(1, { message: "Maximum guests must be at least 1" })
            .optional(),
        })
        .optional(),
      status: z.boolean().default(false),
      timeframe: z.object({
        prices: z.number().min(0, { message: "Price must be a non-negative number" }),
        period: z.string().default("night"),
      }),
      location: z.object({
        cityId: z.string().regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid city ID" }),
        address: z.string().optional(),
      }),
      total_booking: z.number().default(0),
    }),
  });
  