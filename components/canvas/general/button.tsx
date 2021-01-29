export const Button = ({ onClick, children, className, active }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={` border-gray-400 border-l-2 border-t-2 border-b-2 relative inline-flex items-center px-2 py-1  focus:z-10 focus:outline-none  text-sm font-medium border-gray-400 bg-gray-200 text-gray-700 hover:bg-gray-100 ${className}`}
    >
      {children}
    </button>
  );
};

export const ButtonGroup = ({ children }) => {
  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      {children}
    </span>
  );
};
