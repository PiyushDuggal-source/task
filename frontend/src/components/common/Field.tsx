import React from "react";
import { Field } from "formik";

interface FormikFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
}

const FormikField = ({
  name,
  label,
  placeholder,
  ...props
}: FormikFieldProps) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <Field
        id={name}
        name={name}
        placeholder={placeholder}
        className="w-full px-3 py-2 border-b border-gray-300 shadow-sm poppins-regular focus:ring-0 active:ring-0 focus:outline-none focus:ring-blue-500"
        {...props}
      />
    </div>
  );
};

export default FormikField;
