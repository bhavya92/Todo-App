export const Button = (props) => {
  return (
    <button
      {...props}
      className={`text-roboto text-stone-50 bg-stone-800 p-2 rounded-sm hover:outline hover:outline-2 hover:outline-stone-900 ${props.className}`}
    >
      {props.children}
    </button>
  );
};
