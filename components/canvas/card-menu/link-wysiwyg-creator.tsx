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
    <form onSubmit={updateLink}>
      <label
        for="company_website"
        className="block text-sm font-medium text-gray-700"
      >
        Company Website
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
          http://
        </span>
        <input
          value={href}
          onChange={(e) => setHref(e.target.value)}
          type="text"
          name="company_website"
          id="company_website"
          className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
          placeholder="www.example.com"
        />
      </div>
    </form>
  );
};
