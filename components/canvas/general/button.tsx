export const Button = ({ onClick, children, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
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
