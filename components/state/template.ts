import {
  CheckCircleOutline,
  EyeOutline,
  FlagOutline,
  LightBulbOutline,
  LightningBoltOutline,
  ScaleOutline,
} from "heroicons-react";
import { atom } from "recoil";

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
      { id: 1, name: "Context", x: 40, y: 0 },
      { id: 2, name: "Stakeholders", x: 40, y: 200 },
      { id: 14, name: "Question", x: 40, y: 100 },
      { id: 3, name: "Decision", x: 200, y: 100 },
      { id: 4, name: "Option", x: 360, y: 0 },
      { id: 5, name: "Option", x: 360, y: 80 },
      { id: 6, name: "Option", x: 360, y: 160 },
      { id: 7, name: "Benefits", x: 520, y: 0 },
      { id: 8, name: "Drawbacks", x: 520, y: 40 },
      { id: 9, name: "Benefits", x: 520, y: 80 },
      { id: 10, name: "Drawbacks", x: 520, y: 120 },
      { id: 11, name: "Benefits", x: 520, y: 160 },
      { id: 12, name: "Drawbacks", x: 520, y: 200 },
      { id: 13, name: "Next Steps", x: 360, y: 240 },
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

export const selectedTemplate = atom<{
  template: Template;
  replaceCursor: boolean;
}>({
  key: "TEMPLATE/selected-template",
  default: {
    template: null,
    replaceCursor: false,
  },
});
