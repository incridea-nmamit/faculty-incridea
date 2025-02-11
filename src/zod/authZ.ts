import { z } from "zod";

export const loginZ = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters" }),
  })
  .refine((data) => {
    if (data.email.endsWith("@nitte.edu.in")) {
      return true;
    }
    return "Please login with organisational email only";
  });
