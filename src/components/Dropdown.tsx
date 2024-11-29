"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

interface DropdownItemProps {
  value: string;
  onClick: (value: string) => void;
}

const DropdownItem = ({ value, onClick }: DropdownItemProps) => {
  return (
    <li
      className="cursor-pointer border-b py-1 text-center text-sm font-semibold"
      onClick={() => onClick(value)} // Pass the value to the onClick handler
    >
      {value}
    </li>
  );
};

interface DropdownProps {
  onClick: (value: string) => void;
  data: string[];
  label: string;
}

const Dropdown = ({ onClick, data, label }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleOptionValue = (selectedValue: string) => {
    setValue(selectedValue);
    setOpen(false);
    onClick(selectedValue); // Pass the selected value to the parent onClick handler
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-fit" ref={ref}>
      <div
        className="flex cursor-pointer items-center justify-center gap-2 border px-1 py-2 sm:px-3"
        onClick={handleOpen}
      >
        <label
          htmlFor="size"
          className="w-[60px] cursor-pointer text-center text-md font-semibold text-dark"
        >
          {value || label}
        </label>
        {open ? <IoMdArrowDropup size={20} /> : <IoMdArrowDropdown size={20} />}
      </div>
      {open && (
        <ul className="absolute left-0 right-0 top-11 z-10 bg-white shadow">
          {data.map((item) => (
            <DropdownItem key={item} value={item} onClick={handleOptionValue} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
