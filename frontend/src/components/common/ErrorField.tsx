import React from "react";
import { ErrorMessage } from "formik";

interface FormikErrorMessageProps {
  name: string;
}

const FormikErrorMessage = ({ name }: FormikErrorMessageProps) => (
  <ErrorMessage name={name}>
    {(msg) => <div className="mt-1 text-sm text-red-500">{msg}</div>}
  </ErrorMessage>
);

export default FormikErrorMessage;
