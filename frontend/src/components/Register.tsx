import React, { useEffect } from "react";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import registerImg from "../assets/images/registerPng.png";
import * as Yup from "yup";
import axiosClient from "../api/axiosClient";
import FormikField from "./common/Field";
import FormikErrorMessage from "./common/ErrorField";
import PrimaryButton from "./common/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../service/service";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  phone: Yup.string().required("Phone number is required"),
});

const Register = () => {
  const navigate = useNavigate();

  const authContext = React.useContext(AuthContext);

  useEffect(() => {
    if (authContext !== undefined && authContext.isAuthenticated) {
      navigate("/");
    }
  }, [authContext]);

  const initialValues: Values = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: Values) => {
    try {
      console.log("values:", values);
      const response = await registerUser(values);
      if (response.registered) {
        toast.success("Registration successful");
        authContext?.setIsAuthenticated(true);
        authContext?.setUser(response.user);
        console.log("Registration successful:", response.user);
        return navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex w-full sm:flex-row">
      <div className="hidden sm:flex sm:w-[50%] mx-auto">
        <img
          className="object-contain h-screen"
          src={registerImg}
          alt="login"
        />
      </div>
      <div className="sm:w-[50%] my-auto px-20">
        <h3 className="mb-20 text-6xl volkhov-regular text-[#484848]">FASCO</h3>

        <h3 className="mb-6 text-3xl volkhov-regular">Create account</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="text-lg">
            <div className="sm:flex sm:gap-2">
              <div className="flex flex-col">
                <FormikField name="firstName" placeholder="First name" />
                <FormikErrorMessage name="firstName" />
              </div>

              <div className="flex flex-col">
                <FormikField name="lastName" placeholder="Last name" />
                <FormikErrorMessage name="lastName" />
              </div>
            </div>

            <div className="sm:flex sm:gap-2">
              <div className="flex flex-col">
                <FormikField
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                />
                <FormikErrorMessage name="email" />
              </div>
              <div className="flex flex-col">
                <FormikField
                  name="phone"
                  type="text"
                  placeholder="Phone number"
                />
                <FormikErrorMessage name="phone" />
              </div>
            </div>
            <div className="sm:flex sm:gap-2">
              <div className="flex flex-col">
                <FormikField
                  name="password"
                  type="password"
                  placeholder="password"
                />
                <FormikErrorMessage name="password" />
              </div>

              <div className="flex flex-col">
                <FormikField
                  name="confirmPassword"
                  type="password"
                  placeholder="confirm password"
                />
                <FormikErrorMessage name="confirmPassword" />
              </div>
            </div>
            <PrimaryButton className="mt-4" type="submit">
              Create account
            </PrimaryButton>
            <div className="flex flex-col mt-2 text-center">
              <p>
                Already have an account?
                <Link className="ml-1 text-blue-600" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
