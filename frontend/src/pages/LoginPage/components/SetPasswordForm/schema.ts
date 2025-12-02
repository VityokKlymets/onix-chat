import * as yup from "yup";

export const schema = yup
  .object({
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password must be at least 8 characters")
      .max(20, "Password must not exceed 20 characters"),
    passwordConfirm: yup
      .string()
      .required("Password confirmation is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();
