import React from "react";

const FormInput = ({
  name,
  label,
  placeholder,
  type,
  onChange,
  value,
  className,
  ref,
}: {
  name: string;
  label?: string;
  placeholder: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  className?: string;
  ref?: React.RefObject<HTMLInputElement>;
}) => {
  return (
    <div
      className={`group relative min-h-10 w-[200px] max-w-[300px] border border-opacity-50 px-4 py-2 ${className}`}
      style={{ border: "1px solid #ccc" }}
    >
      <input
        ref={ref}
        type={type}
        // value={value}
        defaultValue={value}
        id="name"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="absolute inset-0 z-10 border-none px-3 focus:outline-none focus:ring-2 focus:ring-secondary"
      />
      {label && (
        <label
          htmlFor="name"
          className="absolute left-2 top-1 -z-10  w-0 bg-white px-2 text-xs font-semibold opacity-100 transition-all duration-100 group-focus-within:z-10 group-focus-within:w-fit group-focus-within:-translate-y-full group-focus-within:text-secondary"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
