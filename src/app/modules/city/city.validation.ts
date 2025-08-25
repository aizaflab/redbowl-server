import { z } from 'zod';

export const createCityValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, { message: "City name must be 2 or more characters long" })
      .regex(/^[a-z\s]+$/i, {
        message: "City name must contain only letters and spaces",
      }),
    tax: z
      .number()
      .min(0, { message: "Tax must be a non-negative number" }),
  }),
});
