import React, { ChangeEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type,
  disabled,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div
      tabIndex={0}
      className={`flex items-center ${
        type == "password"
          ? "border-2 border-neutral-800 rounded-md focus-within:border-sky-500"
          : ""
      }`}
    >
      <input
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={showPassword ? "text" : type}
        className={`w-full p-4 text-lg bg-black rounded-md outline-none border-neutral-800 text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:cursor-not-allowed ${
          type == "password"
            ? "border-none focus:border-sky-500 outline-none"
            : "border-2"
        }`}
      />
      {type == "password" &&
        (showPassword ? (
          <FaEye
            className="mr-3"
            size={25}
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <FaEyeSlash
            className="mr-3"
            size={25}
            onClick={() => setShowPassword(true)}
          />
        ))}
    </div>
  );
};
export default Input;
