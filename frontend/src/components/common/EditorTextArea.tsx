import React from "react";
import { Field } from "formik";

interface FormikFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder?: string;
}

const EditorTextArea = ({
  name,
  label,
  placeholder,
  ...props
}: FormikFieldProps) => {
  return (
    <div className="mb-4 poppins-regular">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <Field
        id={name}
        name={name}
        as="textarea"
        placeholder={placeholder}
        className="w-full px-3 py-3 h-24 border border-gray-300 shadow-sm poppins-regular focus:ring-0 active:ring-0 focus:outline-none focus:ring-blue-500"
        {...props}
      />
    </div>
  );
};

export default EditorTextArea;
