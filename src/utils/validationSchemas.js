import { z } from "zod";

// Register Schema
export const registerSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" })
    .max(50, { message: "Username must be no more than 50 characters long" }),
  email: z
    .string()
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(200, { message: "Email must be no more than 200 characters long" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  isAdmin: z.boolean().refine((value) => value === true || value === false, {
    message: "isAdmin must be a boolean value",
  }),
});

// Login Schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(200, { message: "Email must be no more than 200 characters long" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// Update User Profile Schema
export const updateUserSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" })
    .max(100, { message: "Username must be no more than 100 characters long" })
    .optional(),
  email: z
    .string()
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(200, { message: "Email must be no more than 200 characters long" })
    .email({ message: "Invalid email address" })
    .optional(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .optional(),
});
