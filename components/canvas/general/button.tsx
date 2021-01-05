export const Button = ({ onClick, children, className, active }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={` relative inline-flex items-center px-4 py-2 border focus:z-10 focus:outline-none focus:ring-1  text-sm font-medium ${
        !active
          ? `border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500`
          : `text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`
      } ${className}`}
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
