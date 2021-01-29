export const Button = ({ onClick, children, className, active }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={` border-gray-400 border-l-4 border-t-4 border-b-4 relative inline-flex items-center px-2 py-1  focus:z-10 focus:outline-none  text-sm font-medium border-gray-400 bg-gray-300 text-gray-700 hover:bg-gray-50 ${className}`}
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
