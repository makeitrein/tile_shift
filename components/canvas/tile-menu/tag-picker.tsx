import {
  AcademicCapOutline,
  AdjustmentsOutline,
  ArchiveOutline,
  ArrowCircleRightOutline,
  BanOutline,
  BeakerOutline,
  CalculatorOutline,
  ChartSquareBarOutline,
  ClipboardListOutline,
  ClockOutline,
  CollectionOutline,
  ExclamationOutline,
  ExternalLinkOutline,
  FingerPrintOutline,
  FireOutline,
  FlagOutline,
  PencilAltOutline,
  PhotographOutline,
  PuzzleOutline,
  QuestionMarkCircleOutline,
  ShieldExclamationOutline,
  SpeakerphoneOutline,
  SunOutline,
  TagOutline,
  VariableOutline,
} from "heroicons-react";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
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
    ],
  },
];

const subcategoryGroups = [
  {
    name: "Status",
    tags: [
      { name: "Backlog", color: "light-blue", icon: AcademicCapOutline },

      { name: "Todo", color: "light-blue", icon: AcademicCapOutline },
      { name: "In-Progress", color: "light-blue", icon: AcademicCapOutline },
      {
        name: "Done",
        color: "indigo",
        icon: BeakerOutline,
      },
      {
        name: "Blocked",
        color: "indigo",
        icon: BeakerOutline,
      },
      { name: "Awaiting Review", color: "amber", icon: PuzzleOutline },
    ],
  },
  {
    name: "Priority",
    tags: [
      { name: "P1", color: "light-blue", icon: AcademicCapOutline },
      { name: "P2", color: "light-blue", icon: AcademicCapOutline },
      { name: "P3", color: "light-blue", icon: AcademicCapOutline },
      { name: "P4", color: "light-blue", icon: AcademicCapOutline },
    ],
  },
  {
    name: "Deadlines",
    tags: [
      { name: "Feedback", color: "light-blue", icon: AcademicCapOutline },
      { name: "P2", color: "light-blue", icon: AcademicCapOutline },
      { name: "P3", color: "light-blue", icon: AcademicCapOutline },
      { name: "P4", color: "light-blue", icon: AcademicCapOutline },
    ],
  },
  {
    name: "Teams",
    tags: [
      { name: "Software", color: "light-blue", icon: AcademicCapOutline },
      { name: "Design", color: "light-blue", icon: AcademicCapOutline },
      { name: "Marketing", color: "light-blue", icon: AcademicCapOutline },
      { name: "HR", color: "light-blue", icon: AcademicCapOutline },
      { name: "Finance", color: "light-blue", icon: AcademicCapOutline },
      { name: "Executives", color: "light-blue", icon: AcademicCapOutline },
    ],
  },
];

const allTags = tagGroups.map((group) => group.tags).flat();
const allSubcategories = subcategoryGroups.map((group) => group.tags).flat();

export const TagPicker = ({ id, closePanel }) => {
  const setTileSettings = useSetRecoilState(tileState.tileSettings(id));

  const handleTagClick = (clickedTag: string) => {
    setTileSettings((tile) => ({ ...tile, tags: [clickedTag] }));
    closePanel();
  };

  return (
    <div className="pb-1.5  grid grid-cols-2 grid-">
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

export const SubcategoryPicker = ({ id, openPanel }) => {
  const [tileSettings, setTileSettings] = useRecoilState(
    tileState.tileSettings(id)
  );

  const handleTagClick = (clickedTag: string) => {
    setTileSettings((tile) => ({ ...tile, tags: [clickedTag] }));
  };

  return <>Create Custom Tag</>;
};

export const Tag = ({
  name,
  onClick,
}: {
  name: string;
  onClick?: () => void;
}) => {
  const tag = [...allTags, ...allSubcategories].find(
    (tag) => tag.name === name
  );
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

  return (
    <span
      onClick={onClick}
      className={`inline-flex  cursor-pointer items-center px-2.5 rounded-full text-xs  font-medium hover:bg-${color}-200 hover:text-${color}-900 bg-${color}-100 text-${color}-800 `}
    >
      <Icon width={16} />

      <span className="pl-1">{name}</span>
    </span>
  );
};
