"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const DropdownItem = ({
  value,
  onClick,
}: {
  value: string;
  onClick: () => void;
}) => {
  return (
    <li
      className="py-1 text-sm font-semibold cursor-pointer text-center border-b"
      onClick={onClick}
    >
      {value}
    </li>
  );
};

const Dropdown = ({
  onClick,
  data,
  label,
}: {
  onClick: () => void;
  data: string[];
  label: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState("");

  const ref = useRef(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleOptionValue = (value: string) => {
    setValue(value);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-fit">
      <div
        className="flex items-center justify-center gap-2 py-2 px-3 border cursor-pointer"
        onClick={handleOpen}
      >
        <label
          htmlFor="size"
          className="text-md font-semibold text-dark cursor-pointer w-[60px] text-center"
        >
          {value || label}
        </label>
        {open ? <IoMdArrowDropup size={20} /> : <IoMdArrowDropdown size={20} />}
      </div>
      {open && (
        <ul
          className={`z-10 absolute top-11 left-0 right-0 bg-white shadow`}
          ref={ref}
        >
          {data.map((item) => (
            <DropdownItem
              key={item}
              value={item}
              onClick={() => handleOptionValue(item)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
