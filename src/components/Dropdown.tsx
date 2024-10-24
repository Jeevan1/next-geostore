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
      className="py-1 text-sm font-semibold cursor-pointer text-center border-b"
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
        <ul className="z-10 absolute top-11 left-0 right-0 bg-white shadow">
          {data.map((item) => (
            <DropdownItem key={item} value={item} onClick={handleOptionValue} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
