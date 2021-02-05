import React from "react";

export const DiscussionItem = () => (
  <li className="group">
    <div className="flex space-x-3">
      <div className="flex-shrink-0 relative">
        <span className="inline-block relative mr-1">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-300"></span>
        </span>
      </div>
      <div>
        <div className="text-sm">
          <a href="#" className="font-medium text-gray-900">
            Leslie Alexander
          </a>
          <span className="text-gray-500 text-xs font-small pl-1.5 inline-block">
            4d ago
          </span>
        </div>
        <div className="mt-1 text-sm text-gray-700">
          <p>
            Ducimus quas delectus ad maxime totam doloribus reiciendis ex.
            Tempore dolorem maiores. Similique voluptatibus tempore non ut.
          </p>
        </div>
        <div className="-mt-2 text-sm space-x-2 opacity-0 group-hover:opacity-100 transition-all">
          <button type="button" className="text-gray-900 font-medium ">
            Reply
          </button>
        </div>
      </div>
    </div>
  </li>
);
