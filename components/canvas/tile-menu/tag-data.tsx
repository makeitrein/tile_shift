import {
  AcademicCapOutline,
  ArchiveOutline,
  BanOutline,
  BeakerOutline,
  CalculatorOutline,
  ChartSquareBarOutline,
  ClipboardListOutline,
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
  SpeakerphoneOutline,
} from "heroicons-react";

export const tagGroups = [
  {
    name: "Vision",
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
    name: "Blocker",
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
  // },
  // {
  //   name: "Causality",
  //   tags: [
  //     { name: "When...", color: "light-blue", icon: ClockOutline },
  //     { name: "If...", color: "indigo", icon: AdjustmentsOutline },
  //     { name: "Then...", color: "amber", icon: ArrowCircleRightOutline },
  //     { name: "Because...", color: "orange", icon: VariableOutline },
  //     { name: "Therefore...", color: "green", icon: SunOutline },
  //     { name: "Unless...", color: "red", icon: ShieldExclamationOutline },
  //   ],
  // },

  // {
  //   name: "Decision Making",
  //   tags: [
  //     { name: "Context", color: "light-blue", icon: InformationCircleOutline },
  //     { name: "Decision", color: "light-blue", icon: ScaleOutline },
  //     { name: "Option", color: "indigo", icon: CursorClickOutline },
  //     { name: "Stakeholders", color: "light-blue", icon: UsersOutline },
  //     { name: "Deadline", color: "light-blue", icon: UsersOutline },

  //     { name: "Benefits", color: "orange", icon: ScaleOutline },
  //     { name: "Drawbacks", color: "orange", icon: ScaleOutline },
  //     { name: "Pro", color: "green", icon: FolderAddOutline },
  //     { name: "Con", color: "red", icon: FolderRemoveOutline },
  //     { name: "Outcome", color: "amber", icon: ChartPieOutline },
  //   ],
  // },

  // {
  //   name: "Questions",
  //   tags: [
  //     { name: "Why?", color: "light-blue", icon: ClockOutline },
  //     { name: "Where?", color: "indigo", icon: ClockOutline },
  //     { name: "Who?", color: "amber", icon: ClockOutline },
  //     { name: "When?", color: "orange", icon: ClockOutline },
  //     { name: "How?", color: "green", icon: ClockOutline },
  //   ],
  // },

  // {
  //   name: "Time",
  //   tags: [
  //     { name: "Deadline", color: "light-blue", icon: ClockOutline },
  //     { name: "Availability", color: "indigo", icon: ClockOutline },
  //     { name: "Estimate", color: "amber", icon: ClockOutline },
  //     { name: "Daily Checkin", color: "orange", icon: ClockOutline },
  //     { name: "Weekly Recap", color: "green", icon: ClockOutline },
  //     { name: "Overdue", color: "red", icon: ClockOutline },
  //   ],
  // },

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

  // {
  //   name: "People",
  //   tags: [{ name: "Add Tag", color: "gray", icon: PlusOutline }],
  // },

  // {
  //   name: "Teams",
  //   tags: [{ name: "Add Tag", color: "gray", icon: PlusOutline }],
  // },
];

export const allTags = tagGroups.map((group) => group.tags).flat();
