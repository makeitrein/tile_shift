import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import {
  CheckCircleOutline,
  EyeOutline,
  FlagOutline,
  LightBulbOutline,
  LightningBoltOutline,
  ScaleOutline,
} from "heroicons-react";
import React from "react";
import styled from "styled-components";

const TileWrapper = styled.div`
  display: inline-block;
  position: absolute;
  width: 240px;
  height: 140px;
  margin: 20px;
  border-radius: 0.5rem;
  background: #eee;
  --color: #4af;
  transition: 0.2s box-shadow, 0.2s border-color, 0.2s background, 0.2s color;
`;

interface Props {}

export const TemplateOption = ({
  icon,
  title,
  description,
  selectTemplate,
}) => {
  return (
    <span
      onClick={() => selectTemplate(title)}
      className="-m-3 p-3 flex items-start cursor-pointer rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
    >
      <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white sm:h-12 sm:w-12">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-base font-medium text-gray-900">{title}</p>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </span>
  );
};

export const templateOptions = [
  {
    icon: FlagOutline,
    title: "Project Scoping",
    description:
      "Get consensus on your project goals, deliverables, tasks, costs and deadlines",
  },

  {
    icon: CheckCircleOutline,
    title: "Task Management",
    description:
      "Prioritize, track, and manage each of your project's tasks throught its lifecycle",
  },
  {
    icon: ScaleOutline,
    title: "Decision Evaluation",
    description:
      "Make fast, informed and de-risked decisions by examining your choices and alternate resolutions",
    tags: [
      { id: 1, name: "Decision", x: 100, y: 100 },
      { id: 2, name: "Option", x: 260, y: 160 },
      { id: 3, name: "Option", x: 260, y: 200 },
      { id: 4, name: "Option", x: 260, y: 240 },
    ],
    arrows: [
      [1, 2],
      [1, 3],
      [1, 4],
    ],
  },
  {
    icon: LightBulbOutline,
    title: "Idea Validation",
    description:
      "Explore the hidden assumptions and supporting evidence behind your hypotheses",
  },
  {
    icon: LightningBoltOutline,
    title: "Brainstorming",
    description:
      "Generate ideas and unlock better answers by amassing potential solutions spontaneously",
  },
  {
    icon: EyeOutline,
    title: "Retrospective",
    description:
      "At the end of a project milestone, reflect and review what worked, what didn't, and why",
  },
];
