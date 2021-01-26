import { useRecoilState } from "recoil";
import * as cardState from "../../state/cards";

const tags = ["Goal", "Strategy", "Requirement", "Assumption", "Risk", "Task"];

export const TagPicker = ({ id }) => {
  const [cardSettings, setCardSettings] = useRecoilState(
    cardState.cardSettings(id)
  );

  const handleTagClick = (clickedTag: string) => {
    const { tags } = cardSettings;

    if (tags.includes(clickedTag)) {
      setCardSettings((card) => ({
        ...card,
        tags: tags.filter((tag) => tag !== clickedTag),
      }));
    } else {
      setCardSettings((card) => ({ ...card, tags: [...tags, clickedTag] }));
    }
  };

  return (
    <div
      style={{ width: 380 }}
      className="flex h-36 w-full flex-wrap flex-col align-middle justify-between"
    >
      {tags.map((tag, i) => (
        <div
          key={i}
          onClick={() => handleTagClick(tag)}
          className="text-2xl text-center w-9 h-9 cursor-pointer transform transition-transform hover:scale-125"
        >
          {tag}
        </div>
      ))}
    </div>
  );
};
