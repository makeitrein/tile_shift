import {
  AcademicCapOutline,
  AdjustmentsOutline,
  ArchiveOutline,
  ArrowCircleRightOutline,
  BanOutline,
  BeakerOutline,
  ChartSquareBarOutline,
  ClipboardListOutline,
  ClockOutline,
  ExclamationCircleOutline,
  ExclamationOutline,
  FingerPrintOutline,
  FireOutline,
  FlagOutline,
  LightBulbOutline,
  PencilAltOutline,
  PuzzleOutline,
  QuestionMarkCircleOutline,
  ShieldExclamationOutline,
  TagOutline,
  VariableOutline,
  ViewGridOutline,
} from "heroicons-react";
import React from "react";
import { useRecoilState } from "recoil";
import * as cardState from "../../state/cards";

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
        icon: LightBulbOutline,
      },
      { name: "Goal", color: "indigo", icon: FlagOutline },
      { name: "Requirement", color: "amber", icon: ClipboardListOutline },
      {
        name: "Out of Scope",
        color: "orange",
        icon: BanOutline,
      },
      { name: "Success Metric", color: "green", icon: ChartSquareBarOutline },
      { name: "Risk", color: "red", icon: FireOutline },
    ],
  },
  {
    name: "Causality",
    tags: [
      { name: "When...", color: "light-blue", icon: ClockOutline },
      { name: "If...", color: "indigo", icon: AdjustmentsOutline },
      { name: "Then...", color: "amber", icon: ArrowCircleRightOutline },
      { name: "Because...", color: "orange", icon: VariableOutline },
      { name: "Therefore...", color: "green", icon: ExclamationCircleOutline },
      { name: "Unless...", color: "red", icon: ShieldExclamationOutline },
    ],
  },

  {
    name: "General",
    tags: [
      { name: "Note", color: "gray", icon: PencilAltOutline },
      { name: "Todo", color: "gray", icon: ViewGridOutline },
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

export const TagPicker = ({ id }) => {
  return (
    <div className="pb-1.5 w-44 ">
      <TagPickerContents id={id} />
    </div>
  );
};

export const TagPickerContents = ({ id, openPanel }) => {
  const [cardSettings, setCardSettings] = useRecoilState(
    cardState.cardSettings(id)
  );

  const handleTagClick = (clickedTag: string) => {
    setCardSettings((card) => ({ ...card, tags: [clickedTag] }));
  };

  return (
    <div>
      {tagGroups.map(({ name, tags }) => (
        <div className="pb-1">
          <label className="text-xs mt-1 font-bold -ml-px pb-1.5 text-gray-700 block">
            {name}:
          </label>
          {tags.map(({ name }) => (
            <div className="pb-1" onClick={() => handleTagClick(name)}>
              <Tag name={name} />
            </div>
          ))}
        </div>
      ))}
      {/*
      <Button
        rightIcon="arrow-right"
        intent="primary"
        text="Custom Tags"
        className="mt-4"
        onClick={() =>
          openPanel({
            component: SubcategoryPicker, // <- class or stateless function type
            props: { id }, // <- SettingsPanel props without IPanelProps
            title: "Subcategory", // <- appears in header and back button
          })
        }
      /> */}
    </div>
  );
};

export const SubcategoryPicker = ({ id, openPanel }) => {
  const [cardSettings, setCardSettings] = useRecoilState(
    cardState.cardSettings(id)
  );

  const handleTagClick = (clickedTag: string) => {
    setCardSettings((card) => ({ ...card, tags: [clickedTag] }));
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
