import { useState } from "react";
import { useRemirror } from "remirror/react";

export const LinkWysiwygCreator = () => {
  const { commands, focus } = useRemirror({ autoUpdate: true });
  const [href, setHref] = useState("");
  const updateLink = (e) => {
    e.preventDefault();
    commands.updateLink({ href, auto: true });
    focus();
  };
  return (
    <form onSubmit={updateLink} className="p-3">
      <div className="mt-1 flex rounded-sm shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-sm border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
          http://
        </span>
        <input
          value={href}
          onChange={(e) => setHref(e.target.value)}
          type="text"
          name="company_website"
          id="company_website"
          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
          placeholder="www.example.com"
        />
      </div>
    </form>
  );
};
