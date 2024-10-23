import React from "react";

const FormInput = ({
  name,
  label,
  placeholder,
  type,
  onChange,
  value,
  className,
}: {
  name: string;
  label?: string;
  placeholder: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  className?: string;
}) => {
  return (
    <div
      className={`border border-opacity-50 px-4 py-2 relative w-[200px] max-w-[300px] group min-h-10 ${className}`}
      style={{ border: "1px solid #ccc" }}
    >
      <input
        type={type}
        value={value}
        defaultValue={value}
        id="name"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="absolute inset-0 border-none focus:outline-none focus:ring-2 focus:ring-secondary px-3 z-10"
      />
      {label && (
        <label
          htmlFor="name"
          className="absolute left-2 top-1 w-0  px-2 bg-white font-semibold text-xs -z-10 opacity-100 transition-all duration-100 group-focus-within:w-fit group-focus-within:-translate-y-full group-focus-within:z-10 group-focus-within:text-secondary"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
