import {
  PaperAirplaneOutline,
  QuestionMarkCircleOutline,
  ThumbDownOutline,
  ThumbUpOutline,
} from "heroicons-react";
import React, { useState } from "react";

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

export const Discussion = () => (
  <section
    className="overflow-y-auto h-full pr-6"
    aria-labelledby="notes-title"
  >
    <div className=" sm:rounded-lg sm:overflow-hidden">
      <div className="divide-y divide-gray-200">
        <div className="py-6 ">
          <ul className="space-y-4">
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export const DiscussionForm = React.memo(() => {
  return (
    <div className="bg-gray-50 px-4 py-6 sm:px-6">
      <div className="flex space-x-3">
        <div className="min-w-0 flex-1">
          <form action="#">
            <div>
              <label className="sr-only">About</label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                placeholder="Message"
              ></textarea>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span>
                <ApprovalButton />
                <QuestionButton />
                <DenyButton />
              </span>
              <button
                type="submit"
                className={`inline-flex ml-2 py-1.5 cursor-pointer items-center px-2.5 rounded-full text-xs border font-medium hover:bg-blue-200 hover:text-blue-900 bg-blue-100 text-blue-800 border-blue-800  `}
              >
                <PaperAirplaneOutline
                  size={16}
                  className="transform rotate-90"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

const ApprovalButton = () => {
  const [approve, setApprove] = useState(false);

  const activeColor = "green";
  const color = approve ? "green" : "gray";
  return (
    <span
      onClick={() => setApprove(true)}
      className={`inline-flex cursor-pointer items-center px-2.5 rounded-full text-xs border font-medium hover:bg-${activeColor}-200 hover:text-${activeColor}-900 bg-${color}-100 text-${activeColor}-800 border-${activeColor}-800  `}
    >
      <ThumbUpOutline width={16} />

      <span className="pl-1">Agree</span>
    </span>
  );
};

const QuestionButton = () => {
  const [approve, setApprove] = useState(false);

  const activeColor = "orange";
  const color = approve ? activeColor : "gray";
  return (
    <span
      onClick={() => setApprove(true)}
      className={`inline-flex ml-2 cursor-pointer items-center px-2.5 rounded-full text-xs border font-medium hover:bg-${activeColor}-200 hover:text-${activeColor}-900 bg-${color}-100 text-${activeColor}-800 border-${activeColor}-800  `}
    >
      <QuestionMarkCircleOutline width={16} />

      <span className="pl-1">Question</span>
    </span>
  );
};

const DenyButton = () => {
  const [approve, setApprove] = useState(false);

  const activeColor = "red";
  const color = approve ? "red" : "gray";
  return (
    <span
      onClick={() => setApprove(true)}
      className={`inline-flex ml-2 cursor-pointer items-center px-2.5 rounded-full text-xs border font-medium hover:bg-${activeColor}-200 hover:text-${activeColor}-900 bg-${color}-100 text-${activeColor}-800 border-${activeColor}-800  `}
    >
      <ThumbDownOutline width={16} />

      <span className="pl-1">Disagree</span>
    </span>
  );
};
