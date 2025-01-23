export const Button = (props) => {
  return (
    <button
      {...props}
      className={`text-roboto text-white-50 bg-white-800 p-2 rounded-sm hover:outline hover:outline-2 hover:outline-white-900 ${props.className}`}
    >
      {props.children}
    </button>
  );
};
