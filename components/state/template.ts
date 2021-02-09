import {
  CheckCircleOutline,
  EyeOutline,
  FlagOutline,
  LightBulbOutline,
  LightningBoltOutline,
  ScaleOutline,
} from "heroicons-react";
import { atom, selector } from "recoil";

type TemplateArrow = [number | string, number | string];
type TemplateTag = {
  id: string | number;
  name: string;
  x: number;
  y: number;
  selectedTile?: boolean;
};

export interface Template {
  icon: React.FC;
  title: string;
  description: string;
  tags?: TemplateTag[];
  arrows?: TemplateArrow[];
}

export type TemplateMaker = (selectedTileId?: string | number) => Template;

type TemplateOptions = Record<string, TemplateMaker>;

export const templateOptions: TemplateOptions = {
  scoping: () => ({
    icon: FlagOutline,
    title: "Project Scoping",
    description:
      "Get consensus on your project goals, deliverables, tasks, costs and deadlines",
  }),
  task: () => ({
    icon: CheckCircleOutline,
    title: "Task Management",
    description:
      "Prioritize, track, and manage each of your project's tasks throught its lifecycle",
  }),
  decision: (selectedTileId = 101010) => ({
    icon: ScaleOutline,
    title: "Decision Making",
    description:
      "Make fast, informed and de-risked decisions by examining your choices and alternate resolutions",
    tags: [
      { id: 1, name: "Context", x: 40, y: 0 },
      { id: 2, name: "Stakeholders", x: 40, y: 200 },
      { id: 3, name: "Uncertainties", x: 40, y: 100 },
      { id: selectedTileId, name: "Decision", x: 200, y: 100 },
      { id: 4, name: "Option", x: 360, y: 0 },
      { id: 5, name: "Option", x: 360, y: 80 },
      { id: 6, name: "Option", x: 360, y: 160 },
      { id: 7, name: "Benefits", x: 520, y: 0 },
      { id: 8, name: "Drawbacks", x: 520, y: 40 },
      { id: 9, name: "Benefits", x: 520, y: 80 },
      { id: 10, name: "Drawbacks", x: 520, y: 120 },
      { id: 11, name: "Benefits", x: 520, y: 160 },
      { id: 12, name: "Drawbacks", x: 520, y: 200 },
      { id: 13, name: "Resolution", x: 360, y: 240 },
      { id: 14, name: "Next Steps", x: 520, y: 240 },
    ],
    arrows: [
      [1, selectedTileId],
      [2, selectedTileId],
      [3, selectedTileId],
      [selectedTileId, 4],
      [selectedTileId, 5],
      [selectedTileId, 6],
      [4, 7],
      [4, 8],
      [5, 9],
      [5, 10],
      [6, 11],
      [6, 12],
      [selectedTileId, 13],
      [13, 14],
    ],
  }),
  idea: () => ({
    icon: LightBulbOutline,
    title: "Idea Validation",
    description:
      "Explore the hidden assumptions and supporting Benefits behind your hypotheses",
  }),
  brainstorm: () => ({
    icon: LightningBoltOutline,
    title: "Brainstorming",
    description:
      "Generate ideas and unlock better answers by amassing potential solutions spontaneously",
  }),
  retrospective: () => ({
    icon: EyeOutline,
    title: "Retrospective",
    description:
      "At the end of a project milestone, reflect and review what worked, what didn't, and why",
  }),
};

export const selectedTemplateId = atom<{
  templateId: string;
  replaceCursor: boolean;
}>({
  key: "TEMPLATE/selected-template-id",
  default: {
    templateId: null,
    replaceCursor: false,
  },
});

export const selectedTemplate = selector<TemplateMaker>({
  key: "TEMPLATE/selected-template",
  get: ({ get }) => {
    const { templateId } = get(selectedTemplateId);
    return templateOptions[templateId];
  },
});
