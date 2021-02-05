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
            <div className="flex items-center">
              <textarea
                id="comment"
                name="comment"
                rows={3}
                className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                placeholder="Agree, disagree, or have questions?"
              ></textarea>
              <button
                type="submit"
                className={`inline-flex ml-2 py-1.5 cursor-pointer items-center px-2.5 rounded-md h-full text-xs border font-medium hover:bg-blue-100 hover:text-blue-600 hover:border-blue-500 bg-gray-100 text-gray-500 border-gray-500  transition-all`}
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

interface ConsensusButtonShellProps {
  onClick?: () => void;
  text: string;
  icon: React.ReactNode;
  activeColor: string;
  color: string;
}

export const ConsensusButtonShell = ({
  onClick,
  text,
  icon,
  activeColor,
  color,
}: ConsensusButtonShellProps) => {
  return (
    <span
      onClick={onClick}
      className={`inline-flex cursor-pointer items-center px-2.5 mr-2 rounded-full text-xs border font-medium hover:bg-${activeColor}-200 hover:text-${activeColor}-800 bg-${color}-100 text-${activeColor}-700 border-${activeColor}-400  `}
    >
      {icon}

      <span className="pl-1">{text}</span>
    </span>
  );
};

export const ApprovalButton = () => {
  const [approve, setApprove] = useState(false);

  const activeColor = "green";
  const color = approve ? "green" : "gray";
  return (
    <ConsensusButtonShell
      onClick={() => setApprove(true)}
      color={color}
      activeColor={activeColor}
      icon={<ThumbUpOutline width={16} />}
      text="Agree"
    />
  );
};

export const QuestionButton = () => {
  const [approve, setApprove] = useState(false);

  const activeColor = "orange";
  const color = approve ? activeColor : "gray";
  return (
    <ConsensusButtonShell
      onClick={() => setApprove(true)}
      color={color}
      activeColor={activeColor}
      icon={<QuestionMarkCircleOutline width={16} />}
      text="Question"
    />
  );
};

export const DisagreeButton = () => {
  const [approve, setApprove] = useState(false);

  const activeColor = "red";
  const color = approve ? "red" : "gray";
  return (
    <ConsensusButtonShell
      onClick={() => setApprove(true)}
      color={color}
      activeColor={activeColor}
      icon={<ThumbDownOutline width={16} />}
      text="Disagree"
    />
  );
};
