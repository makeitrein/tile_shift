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
    <div className="w-32 flex justify-between align-center flex-wrap">
      {emojis.map((emoji) => (
        <div
          onClick={() => addEmoji(emoji)}
          className="text-xl text-center w-8 h-8 cursor-pointer transform transition-transform hover:scale-125"
        >
          {emoji}
        </div>
      ))}
    </div>
  );
};
