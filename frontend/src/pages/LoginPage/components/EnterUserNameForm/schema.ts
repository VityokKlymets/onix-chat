import * as yup from "yup";

export const schema = yup
  .object({
    username: yup.string().required().min(5).max(20),
  })
  .required();
