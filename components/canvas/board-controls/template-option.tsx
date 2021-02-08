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

interface Props {
  icon: React.ReactNode;
  title: string;
  description: string;
  selectTemplate?: (title: string) => void;
}

export const TemplateOption = ({
  icon,
  title,
  description,
  selectTemplate,
}: Props) => {
  return (
    <span
      onClick={() => selectTemplate && selectTemplate(title)}
      className={`-m-3 p-3 flex items-start  rounded-lg ${
        selectTemplate && "hover:bg-gray-50 cursor-pointer"
      } transition ease-in-out duration-150`}
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

type TemplateArrow = [number, number];
type TemplateTag = { id: number; name: string; x: number; y: number };

export interface Template {
  icon: React.FC;
  title: string;
  description: string;
  tags?: TemplateTag[];
  arrows?: TemplateArrow[];
}

export const templateOptions: Template[] = [
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
    title: "Decision Making",
    description:
      "Make fast, informed and de-risked decisions by examining your choices and alternate resolutions",
    tags: [
      { id: 1, name: "Context", x: 20, y: 0 },
      { id: 2, name: "Stakeholders", x: 20, y: 200 },
      { id: 3, name: "Decision", x: 210, y: 100 },
      { id: 4, name: "Option", x: 400, y: 0 },
      { id: 5, name: "Option", x: 400, y: 80 },
      { id: 6, name: "Option", x: 400, y: 160 },
      { id: 7, name: "Benefits", x: 580, y: 0 },
      { id: 8, name: "Drawbacks", x: 580, y: 40 },
      { id: 9, name: "Benefits", x: 580, y: 80 },
      { id: 10, name: "Drawbacks", x: 580, y: 120 },
      { id: 11, name: "Benefits", x: 580, y: 160 },
      { id: 12, name: "Drawbacks", x: 580, y: 200 },
      { id: 13, name: "Next Steps", x: 400, y: 240 },
      { id: 14, name: "Question", x: 20, y: 100 },
      // { id: 13, name: "Decision", x: 580, y: 320 },
      // { id: 14, name: "Happy Path", x: 580, y: 320 },
    ],
    arrows: [
      [1, 3],
      [2, 3],
      [3, 4],
      [3, 5],
      [3, 6],
      [4, 7],
      [4, 8],
      [5, 9],
      [5, 10],
      [6, 11],
      [6, 12],
      [3, 13],
      [14, 3],
    ],
  },
  {
    icon: LightBulbOutline,
    title: "Idea Validation",
    description:
      "Explore the hidden assumptions and supporting Benefits behind your hypotheses",
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
