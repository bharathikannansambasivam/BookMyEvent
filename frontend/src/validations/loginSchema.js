import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string().required("Password is required"),
});
