import {
  AcademicCapOutline,
  ArchiveOutline,
  BeakerOutline,
  CalculatorOutline,
  ChartSquareBarOutline,
  ClipboardListOutline,
  ExclamationOutline,
  ExternalLinkOutline,
  FingerPrintOutline,
  FireOutline,
  PencilAltOutline,
  PhotographOutline,
  PlusOutline,
  PuzzleOutline,
  QuestionMarkCircleOutline,
} from "heroicons-react";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import * as tileState from "../../state/tiles";
import { Tag } from "./tag";

const defaultTags = [
  { name: "Idea", color: "light-blue", icon: AcademicCapOutline },
  {
    name: "Context",
    color: "indigo",
    icon: BeakerOutline,
  },
  { name: "Assumption", color: "amber", icon: PuzzleOutline },
  { name: "Question", color: "orange", icon: QuestionMarkCircleOutline },
  { name: "Evidence", color: "green", icon: FingerPrintOutline },
  { name: "Counterpoint", color: "red", icon: ExclamationOutline },
  { name: "Solution", color: "green", icon: ChartSquareBarOutline },
  { name: "Problem", color: "red", icon: FireOutline },
  { name: "Note", color: "gray", icon: PencilAltOutline },
  { name: "Data", color: "gray", icon: CalculatorOutline },
  { name: "Photo", color: "gray", icon: PhotographOutline },
  { name: "Resource", color: "gray", icon: ExternalLinkOutline },
  { name: "Todo", color: "gray", icon: ClipboardListOutline },
  { name: "Archive", color: "gray", icon: ArchiveOutline },
  { name: "Add Tag", color: "gray", icon: PlusOutline },
];

export const TagPickerMulti = ({ id }) => {
  const [{ tags }, setTileSettings] = useRecoilState(
    tileState.tileSettings(id)
  );

  const handleTagClick = useCallback(
    (clickedTag: string) => {
      const newTags = tags.includes(clickedTag)
        ? tags.filter((tag) => tag !== clickedTag)
        : [...tags, clickedTag];

      setTileSettings((settings) => ({
        ...settings,
        tags: newTags,
      }));
    },
    [tags]
  );

  return (
    <div className="flex flex-wrap">
      {defaultTags.map(({ name }) => (
        <div className="pb-2 pr-2" onClick={() => handleTagClick(name)}>
          <Tag name={name} active={tags.includes(name)} />
        </div>
      ))}
    </div>
  );
};
