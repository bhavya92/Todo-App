import { forwardRef } from "react";

export const Input = forwardRef((props,ref) => {
  return (
    <input
      ref = {ref}
      {...props}
      className={`h-6 mr-1 text-roboto text-sm rounded-sm py-4 px-2 focus:border focus:border-white-900 focus:outline-none focus:ring-0 ${props.className}`}
    />
  );
});
