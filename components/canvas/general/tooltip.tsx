export const Tooltip = ({ children }) => {
  return (
    <div className="absolute bottom-10 mx-2 left-0">
      <div className="bg-black bg-white text-xs rounded py-2 px-4 right-0 bottom-full">
        {children}
        <svg
          className="absolute text-white h-2 left-0 ml-3 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
        >
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  );
};
