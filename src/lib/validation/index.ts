import { z } from "zod"

/**
 * Validates the sign-up and in data.
 * @param {object} data - The sign-up data to be validated.
 * @param {string} data.name - The name of the user. Used only for sign-up
 * @param {string} data.email - The email address of the user. Used for sign-up and sign-in
 * @param {string} data.password - The password of the user. Used for sign-up and sign-in
 * @param {string} data.confirmPassword - The confirmation password of the user. Used only for sign-up
 * @returns {void}
 */
export const signUpValidation = z.object({
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
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
});

export const signInValidation = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 6 characters.",
  })
})