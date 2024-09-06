import React, { useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import loginImg from "../assets/images/login.png";
import * as Yup from "yup";
import FormikField from "./common/Field";
import PrimaryButton from "./common/PrimaryButton";
import SecondaryButton from "./common/SecondaryButton";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../service/service";
import { AuthContext } from "../context/AuthContext";
import FormikErrorMessage from "./common/ErrorField";
import { toast } from "react-toastify";

interface LoginValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext !== undefined && authContext.isAuthenticated) {
      navigate("/");
    }
  }, [authContext]);

  const navigate = useNavigate();
  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginValues) => {
    try {
      console.log("values:", values);
      const response = await loginUser(values);

      if (response.loggedIn) {
        authContext?.setIsAuthenticated(true);
        authContext?.setUser(response.user);
        toast.success("Login successful");
        return window.location.href = "/";
      }
      console.log("Login successful:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex w-full mt-10 sm:mt-0 sm:flex-row justify-center">
      <div className="hidden sm:flex sm:w-[50%] mx-auto">
        <img className="object-contain h-screen" src={loginImg} alt="login" />
      </div>
      <div className="sm:w-[50%] my-auto px-5 sm:px-20">
        <h3 className="mb-20 text-6xl volkhov-regular text-[#484848]">FASCO</h3>

        <h3 className="mb-6 text-3xl volkhov-regular">Create account</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <FormikField
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
            />
            <FormikErrorMessage name="email" />
            <FormikField
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
            <FormikErrorMessage name="password" />
            <PrimaryButton className="my-2" type="submit">
              Sign in
            </PrimaryButton>
            <SecondaryButton
              onClick={() => navigate("/register")}
              type="submit"
            >
              Register now
            </SecondaryButton>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
