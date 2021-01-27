import { useRecoilState } from "recoil";
import * as cardState from "../../state/cards";

// const tags = [
//   { name: "Goal", color: "gray" },
//   { name: "Objective", color: "red" },
//   { name: "Task", color: "yellow" },
//   { name: "Theory", color: "green" },
//   { name: "Assumption", color: "blue" },
//   { name: "Validation", color: "indigo" },
//   { name: "Strategy", color: "purple" },
//   { name: "Risk", color: "pink" },
//   { name: "Mitigation", color: "indigo" },
//   { name: "Fact", color: "indigo" },
//   { name: "Support", color: "indigo" },
//   { name: "Counterpoint", color: "indigo" },
//   { name: "Unknown", color: "indigo" },
// ];

// const tags = [
//   { name: "Hypothesis", color: "gray" },
//   { name: "Project", color: "gray" },
//   { name: "Plan", color: "gray" },

//   { name: "Objective", color: "gray" },
//   { name: "Goal", color: "gray" },
//   { name: "Plan", color: "gray" },

//   { name: "Evidence", color: "yellow" },
//   { name: "Counterpoint", color: "indigo" },
//   { name: "Unknown", color: "indigo" },

//   { name: "Risk", color: "gray" },
//   { name: "Unknown", color: "gray" },
//   { name: "Plan", color: "gray" },
// ];

// const tagGroups = [
//   {
//     name: "Ideation",
//     tags: [
//       { name: "Hypothesis", color: "blue" },
//       { name: "Validation", color: "green" },
//       { name: "Refutal", color: "red" },
//     ],
//   },

//   {
//     name: "Project",
//     tags: [
//       { name: "Project", color: "blue" },
//       { name: "Goal", color: "indigo" },
//       { name: "Task", color: "green" },
//       { name: "Deadline", color: "yellow" },
//       { name: "Blocker", color: "red" },
//     ],
//   },

//   {
//     name: "Risk",
//     tags: [
//       { name: "Risk", color: "pink" },
//       { name: "Mitigation", color: "green" },
//       { name: "Assumption", color: "yellow" },
//     ],
//   },

//   {
//     name: "General",
//     tags: [
//       { name: "Note", color: "gray" },
//       { name: "Miscellaneous", color: "gray" },
//     ],
//   },
// ];

const SparkleIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const MiscIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const NoteIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

const CautionIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

const QuestionIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const tagGroups = [
  {
    name: "Consensus",
    tags: [
      { name: "Proposal", color: "indigo", icon: SparkleIcon },
      { name: "Support", color: "teal", icon: CheckIcon },
      { name: "Counterpoint", color: "rose", icon: CautionIcon },
      { name: "Unknown", color: "yellow", icon: QuestionIcon },
    ],
  },
  {
    name: "General",
    tags: [
      { name: "Note", color: "gray", icon: NoteIcon },
      { name: "Miscellaneous", color: "gray", icon: MiscIcon },
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
  if (!tag) return null;

  const { icon: Icon, color } = tag;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800`}
    >
      <Icon />

      <span className="pl-1">{name}</span>
    </span>
  );
};
