import "emoji-mart/css/emoji-mart.css";
import { useRemirror } from "remirror/react";
import { useSetCardSettings } from "../../state/utils";

const emojis = [
  "👍",
  "👏",
  "👋",
  "🙌",

  "🔥",
  "💯",
  "🎉",
  "🌈",

  "☠",
  "💩",
  "👻",
  "🙈",

  "👑",
  "🎩",
  "🧠",
  "👀",

  "🌞",
  "⚡",
  "✨",
  "❄️",

  "💣",
  "💥",
  "💫",
  "🍄",

  "💭",
  "💨",
  "👁️‍🗨️",
  "🔮",

  "💊",
  "🧬",
  "🦠",
  "🧫",

  "🗑",
  "🔒",
  "🔓",
  "⏰",

  "📣",
  "🛠",
  "💰",
  "📅",
];

export const EmojiPicker = ({ afterSelect }) => {
  const { commands, focus } = useRemirror({ autoUpdate: true });
  const addEmoji = (emoji) => {
    commands.insertText(emoji);
    focus();
  };
  const setCardSettings = useSetCardSettings();
  return (
    <div className="w-36 flex justify-between align-center flex-wrap">
      {emojis.map((emoji, i) => (
        <div
          key={i}
          onClick={() => addEmoji(emoji)}
          className="text-2xl text-center w-9 h-9 cursor-pointer transform transition-transform hover:scale-125"
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};
