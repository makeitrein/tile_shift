import "emoji-mart/css/emoji-mart.css";
import { useRemirror } from "remirror/react";

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

export const EmojiPicker = () => {
  const { commands, focus } = useRemirror({ autoUpdate: true });
  const addEmoji = (emoji) => {
    commands.insertText(emoji);
    focus();
  };
  return (
    <div
      style={{ width: 380 }}
      className="flex h-36 w-full flex-wrap flex-col align-middle justify-between"
    >
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
