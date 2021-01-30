import {
  AcademicCapOutline,
  ArchiveOutline,
  BanOutline,
  BeakerOutline,
  ChartSquareBarOutline,
  CheckCircleOutline,
  ChevronDoubleRightOutline,
  ClipboardListOutline,
  CubeTransparent,
  ExclamationOutline,
  EyeOutline,
  FingerPrintOutline,
  FireOutline,
  FlagOutline,
  InboxInOutline,
  LightBulbOutline,
  PencilAltOutline,
  PuzzleOutline,
  QuestionMarkCircleOutline,
  StopOutline,
  TagOutline,
  UserOutline,
  ViewGridOutline,
} from "heroicons-react";
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
        name: "Out-of-Scope",
        color: "orange",
        icon: BanOutline,
      },
      { name: "Success Metric", color: "green", icon: ChartSquareBarOutline },
      { name: "Risk", color: "red", icon: FireOutline },
    ],
  },
  {
    name: "Task Management",
    tags: [
      { name: "Project", color: "light-blue", icon: CubeTransparent },
      { name: "Todo", color: "indigo", icon: InboxInOutline },
      { name: "Doing", color: "amber", icon: ChevronDoubleRightOutline },
      { name: "In-Review", color: "orange", icon: EyeOutline },
      { name: "Done", color: "green", icon: CheckCircleOutline },
      { name: "Blocked", color: "red", icon: StopOutline },
    ],
  },
  {
    name: "People",
    tags: [
      { name: "Owner", color: "light-blue", icon: UserOutline },
      { name: "Collaborator", color: "indigo", icon: UserOutline },
      { name: "Client", color: "indigo", icon: UserOutline },
    ],
  },
  {
    name: "General",
    tags: [
      { name: "Note", color: "gray", icon: PencilAltOutline },
      { name: "Miscellaneous", color: "gray", icon: ViewGridOutline },
      { name: "Archive", color: "gray", icon: ArchiveOutline },
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
    <div className="px-3 py-1.5 w-44">
      {tagGroups.map(({ name, tags }) => (
        <div className="py-1">
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
    </div>
  );
};

export const Tag = ({ name }) => {
  const tag = allTags.find((tag) => tag.name === name);
  if (!tag)
    return (
      <span
        className={`inline-flex items-center px-2.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800`}
      >
        <TagOutline width={16} /> <span className="pl-1">Uncategorized</span>
      </span>
    );

  const { icon: Icon, color } = tag;

  return (
    <span
      className={`inline-flex items-center px-2.5 rounded-full text-xs  font-medium hover:bg-${color}-200 hover:text-${color}-900 bg-${color}-100 text-${color}-800 `}
    >
      <Icon width={16} />

      <span className="pl-1">{name}</span>
    </span>
  );
};
