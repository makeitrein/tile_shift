import {
  AcademicCapOutline,
  AdjustmentsOutline,
  ArchiveOutline,
  ArrowCircleRightOutline,
  BanOutline,
  BeakerOutline,
  CalculatorOutline,
  ChartPieOutline,
  ChartSquareBarOutline,
  ClipboardListOutline,
  ClockOutline,
  CollectionOutline,
  CursorClickOutline,
  ExclamationOutline,
  ExternalLinkOutline,
  FingerPrintOutline,
  FireOutline,
  FlagOutline,
  FolderAddOutline,
  FolderRemoveOutline,
  InformationCircleOutline,
  PencilAltOutline,
  PhotographOutline,
  PlusOutline,
  PuzzleOutline,
  QuestionMarkCircleOutline,
  ScaleOutline,
  ShieldExclamationOutline,
  SpeakerphoneOutline,
  SunOutline,
  TagOutline,
  UsersOutline,
  VariableOutline,
} from "heroicons-react";
import React, { CSSProperties } from "react";
import { useSetRecoilState } from "recoil";
import * as tileState from "../../state/tiles";

const tagGroups = [
  {
    name: "Ideation",
    tags: [
      { name: "Thesis", color: "light-blue", icon: AcademicCapOutline },
      {
        name: "Hypothesis",
        color: "indigo",
        icon: BeakerOutline,
      },
      { name: "Assumption", color: "amber", icon: PuzzleOutline },
      { name: "Question", color: "orange", icon: QuestionMarkCircleOutline },
      { name: "Evidence", color: "green", icon: FingerPrintOutline },
      { name: "Counterpoint", color: "red", icon: ExclamationOutline },
      { name: "Add Tag", color: "gray", icon: PlusOutline },
    ],
  },
  {
    name: "Scoping",
    tags: [
      {
        name: "Proposal",
        color: "light-blue",
        icon: SpeakerphoneOutline,
      },
      { name: "Goal", color: "indigo", icon: FlagOutline },
      { name: "Requirement", color: "amber", icon: CollectionOutline },
      {
        name: "Risk",
        color: "orange",
        icon: BanOutline,
      },
      { name: "Solution", color: "green", icon: ChartSquareBarOutline },
      { name: "Problem", color: "red", icon: FireOutline },
      { name: "Add Tag", color: "gray", icon: PlusOutline },
    ],
  },
  {
    name: "Causality",
    tags: [
      { name: "When...", color: "light-blue", icon: ClockOutline },
      { name: "If...", color: "indigo", icon: AdjustmentsOutline },
      { name: "Then...", color: "amber", icon: ArrowCircleRightOutline },
      { name: "Because...", color: "orange", icon: VariableOutline },
      { name: "Therefore...", color: "green", icon: SunOutline },
      { name: "Unless...", color: "red", icon: ShieldExclamationOutline },
      { name: "Add Tag", color: "gray", icon: PlusOutline },
    ],
  },

  {
    name: "Decision Making",
    tags: [
      { name: "Context", color: "light-blue", icon: InformationCircleOutline },
      { name: "Decision", color: "light-blue", icon: ScaleOutline },
      { name: "Option", color: "indigo", icon: CursorClickOutline },
      { name: "Stakeholders", color: "light-blue", icon: UsersOutline },
      { name: "Deadline", color: "light-blue", icon: UsersOutline },

      { name: "Evidence", color: "orange", icon: ScaleOutline },
      { name: "Pro", color: "green", icon: FolderAddOutline },
      { name: "Con", color: "red", icon: FolderRemoveOutline },
      { name: "Outcome", color: "amber", icon: ChartPieOutline },
      { name: "Add Tag", color: "gray", icon: PlusOutline },
    ],
  },

  {
    name: "Questions",
    tags: [
      { name: "Why?", color: "light-blue", icon: ClockOutline },
      { name: "Where?", color: "indigo", icon: ClockOutline },
      { name: "Who?", color: "amber", icon: ClockOutline },
      { name: "When?", color: "orange", icon: ClockOutline },
      { name: "How?", color: "green", icon: ClockOutline },
    ],
  },

  {
    name: "Time",
    tags: [
      { name: "Deadline", color: "light-blue", icon: ClockOutline },
      { name: "Availability", color: "indigo", icon: ClockOutline },
      { name: "Estimate", color: "amber", icon: ClockOutline },
      { name: "Daily Checkin", color: "orange", icon: ClockOutline },
      { name: "Weekly Recap", color: "green", icon: ClockOutline },
      { name: "Overdue", color: "red", icon: ClockOutline },
      { name: "Add Tag", color: "gray", icon: PlusOutline },
    ],
  },

  {
    name: "General",
    tags: [
      { name: "Note", color: "gray", icon: PencilAltOutline },
      { name: "Data", color: "gray", icon: CalculatorOutline },
      { name: "Photo", color: "gray", icon: PhotographOutline },
      { name: "Resource", color: "gray", icon: ExternalLinkOutline },
      { name: "Todo", color: "gray", icon: ClipboardListOutline },
      { name: "Archive", color: "gray", icon: ArchiveOutline },
      { name: "Add Tag", color: "gray", icon: PlusOutline },
    ],
  },

  {
    name: "People",
    tags: [{ name: "Add Tag", color: "gray", icon: PlusOutline }],
  },

  {
    name: "Teams",
    tags: [{ name: "Add Tag", color: "gray", icon: PlusOutline }],
  },
];

const allTags = tagGroups.map((group) => group.tags).flat();

export const TagPicker = ({ id, closePanel }) => {
  const setTileSettings = useSetRecoilState(tileState.tileSettings(id));

  const handleTagClick = (clickedTag: string) => {
    setTileSettings((tile) => ({ ...tile, tags: [clickedTag] }));
    closePanel();
  };

  return (
    <div className="py-4 px-6 grid grid-cols-4">
      {tagGroups.map(({ name, tags }) => (
        <div className="pb-1 px-2">
          <label className="text-xs mt-2 font-bold -ml-px pb-1.5 text-gray-700 block">
            {name}:
          </label>
          {tags.map(({ name }) => (
            <div className="pb-1" onClick={() => handleTagClick(name)}>
              <Tag name={name} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Tag = ({
  name,
  onClick,
  style,
  className,
}: {
  name: string;
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
}) => {
  const tag = [...allTags].find((tag) => tag.name === name);
  if (!tag)
    return (
      <span
        onClick={onClick}
        className={`inline-flex cursor-pointer items-center px-2.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}
      >
        <TagOutline width={16} /> <span className="pl-1">Uncategorized</span>
      </span>
    );

  const { icon: Icon, color } = tag;

  /*
    purge css colors
    hover:bg-light-blue-200 hover:text-light-blue-900 bg-light-blue-100 text-light-blue-800
    hover:bg-indigo-200 hover:text-indigo-900 bg-indigo-100 text-indigo-800
    hover:bg-amber-200 hover:text-amber-900 bg-amber-100 text-amber-800
    hover:bg-orange-200 hover:text-orange-900 bg-orange-100 text-orange-800
    hover:bg-green-200 hover:text-green-900 bg-green-100 text-green-800
    hover:bg-red-200 hover:text-red-900 bg-red-100 text-red-800
    hover:bg-gray-200 hover:text-gray-900 bg-gray-100 text-gray-800

  */

  return (
    <span
      style={style}
      onClick={onClick}
      className={`${className} inline-flex  cursor-pointer items-center px-2.5 rounded-full text-xs font-medium hover:bg-${color}-200 hover:text-${color}-900 bg-${color}-100 text-${color}-800 `}
    >
      <Icon width={16} />

      <span className="pl-1">{name}</span>
    </span>
  );
};
