import { z } from "zod";

/**
 * Validates the sign-up data.
 * @param {object} data - The sign-up data to be validated.
 * @param {string} data.name - The name of the user.
 * @param {string} data.email - The email address of the user.
 * @param {string} data.password - The password of the user.
 * @param {string} data.confirmPassword - The confirmation password of the user.
 */
export const signUpValidation = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Invalid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

/**
 * Validates the sign-in data.
 */
export const signInValidation = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 6 characters.",
  }),
});

/**
 * Validates the input for adding a todo.
 * @param {object} input - The input object.
 * @param {string} input.todo - The todo task name.
 */
export const addTodoValidation = z.object({
  todo: z
    .string()
    .min(2, {
      message: "Task name must be longer than 2 characters",
    })
    .max(500, {
      message: "Task name must be shorter than 500 characters",
    }),
});
