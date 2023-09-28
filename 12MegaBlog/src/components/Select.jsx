import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId(); // Assuming 'useId' is a custom hook
  
  return (
    <div className='w-full'>
      {label && <label htmlFor={id} className=''></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

// Forward the ref to the wrapped component
const ForwardedSelect = React.forwardRef(Select);

export default ForwardedSelect; 