import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <lable htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </lable>
      )}
      <input
        type={type}
        className={`${className} px-3 py-2`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
