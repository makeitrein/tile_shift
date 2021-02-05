import {
  PaperAirplaneOutline,
  QuestionMarkCircleOutline,
  ThumbDownOutline,
  ThumbUpOutline,
} from "heroicons-react";
import React, { useState } from "react";

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
