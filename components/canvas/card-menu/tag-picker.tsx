import {
  AcademicCap,
  Ban,
  Beaker,
  CheckCircle,
  Fire,
  Flag,
  InboxIn,
  InformationCircle,
  LightBulb,
  Pause,
  Pencil,
  PresentationChartBar,
  Puzzle,
  QuestionMarkCircle,
  ShieldExclamation,
  ViewGrid,
} from "heroicons-react";
import { useRecoilState } from "recoil";
import * as cardState from "../../state/cards";

const tagGroups = [
  {
    name: "Ideation",
    tags: [
      {
        name: "Hypothesis",
        color: "light-blue",
        icon: Beaker,
      },
      { name: "Thesis", color: "amber", icon: AcademicCap },
      { name: "Assumption", color: "cyana", icon: Puzzle },
      { name: "Question", color: "orange", icon: QuestionMarkCircle },
      { name: "Evidence", color: "green", icon: PresentationChartBar },
      { name: "Counterpoint", color: "red", icon: ShieldExclamation },
    ],
  },
  {
    name: "Scoping",
    tags: [
      {
        name: "Proposal",
        color: "light-blue",
        icon: LightBulb,
      },
      { name: "Goal", color: "amber", icon: Flag },
      { name: "Requirement", color: "cyan", icon: QuestionMarkCircle },
      {
        name: "Out-of-Scope",
        color: "orange",
        icon: Ban,
      },
      { name: "Risk", color: "red", icon: Fire },
    ],
  },
  {
    name: "Task Management",
    tags: [
      { name: "Todo", color: "light-blue", icon: InboxIn },
      { name: "Doing", color: "amber", icon: InformationCircle },
      { name: "Done", color: "green", icon: CheckCircle },
      { name: "Blocked", color: "red", icon: Pause },
    ],
  },
  {
    name: "General",
    tags: [
      { name: "Note", color: "gray", icon: Pencil },
      { name: "Miscellaneous", color: "gray", icon: ViewGrid },
    ],
  },
];

const allTags = tagGroups.map((group) => group.tags).flat();

export const TagPicker = ({ id }) => {
  const [cardSettings, setCardSettings] = useRecoilState(
    cardState.cardSettings(id)
  );

  const handleTagClick = (clickedTag: string) => {
    setCardSettings((card) => ({ ...card, tags: [clickedTag] }));
  };

  return (
    <div>
      {tagGroups.map(({ name, tags }) => (
        <div className="py-1">
          <label className="text-xs font-bold -ml-1 pb-1 text-gray-700 block">
            {name}:
          </label>
          {tags.map(({ name }) => (
            <span className="pr-1" onClick={() => handleTagClick(name)}>
              <Tag name={name} />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Tag = ({ name }) => {
  const tag = allTags.find((tag) => tag.name === name);
  if (!tag) return null;

  const { icon: Icon, color } = tag;

  return (
    <span
      className={`inline-flex items-center px-2.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
    >
      <Icon width={16} />

      <span className="pl-1">{name}</span>
    </span>
  );
};
