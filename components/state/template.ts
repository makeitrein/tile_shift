import {
  CheckCircleOutline,
  EyeOutline,
  FlagOutline,
  LightBulbOutline,
  LightningBoltOutline,
  ScaleOutline,
} from "heroicons-react";
import { atom, selector } from "recoil";

type TagId = number;

type TemplateArrow = [TagId, TagId];
type TemplateTag = {
  name: string;
  x: number;
  y: number;
};

export interface Template {
  icon: React.FC;
  title: string;
  description: string;
  focalTagId?: TagId;
  tags?: Record<TagId, TemplateTag>;
  arrows?: TemplateArrow[];
}

interface Coordinates {
  x?: number;
  y?: number;
  multiplier?: number;
}

export type TemplateMaker = (coordinates?: Coordinates) => Template;

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
  decision: ({ x = 0, y = 0, multiplier = 1 } = {}) => ({
    icon: ScaleOutline,
    title: "Decision Making",
    description:
      "Make fast, informed and de-risked decisions by examining your choices and alternate resolutions",

    focalTagId: 55,
    tags: {
      1: { name: "Context", x: x + 40 * multiplier, y: y + 0 * multiplier },
      2: {
        name: "Stakeholders",
        x: x + 40 * multiplier,
        y: y + 200 * multiplier,
      },
      3: {
        name: "Uncertainties",
        x: x + 40 * multiplier,
        y: y + 100 * multiplier,
      },
      55: {
        name: "Decision",
        x: x + 200 * multiplier,
        y: y + 100 * multiplier,
      },
      4: { name: "Option", x: x + 360 * multiplier, y: y + 0 * multiplier },
      5: {
        name: "Option",
        x: x + 360 * multiplier,
        y: y + 80 * multiplier,
      },
      6: {
        name: "Option",
        x: x + 360 * multiplier,
        y: y + 160 * multiplier,
      },
      7: {
        name: "Benefits",
        x: x + 520 * multiplier,
        y: y + 0 * multiplier,
      },
      8: {
        name: "Drawbacks",
        x: x + 520 * multiplier,
        y: y + 40 * multiplier,
      },
      9: {
        name: "Benefits",
        x: x + 520 * multiplier,
        y: y + 80 * multiplier,
      },
      10: {
        name: "Drawbacks",
        x: x + 520 * multiplier,
        y: y + 120 * multiplier,
      },
      11: {
        name: "Benefits",
        x: x + 520 * multiplier,
        y: y + 160 * multiplier,
      },
      12: {
        name: "Drawbacks",
        x: x + 520 * multiplier,
        y: y + 200 * multiplier,
      },
      13: {
        name: "Resolution",
        x: x + 360 * multiplier,
        y: y + 240 * multiplier,
      },
      14: {
        name: "Next Steps",
        x: x + 520 * multiplier,
        y: y + 240 * multiplier,
      },
    },
    arrows: [
      [1, 55],
      [2, 55],
      [3, 55],
      [55, 4],
      [55, 5],
      [55, 6],
      [4, 7],
      [4, 8],
      [5, 9],
      [5, 10],
      [6, 11],
      [6, 12],
      [55, 13],
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
