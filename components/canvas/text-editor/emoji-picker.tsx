import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useRemirror } from "remirror/react";
import { useSetCardSettings } from "../../state/utils";

export const EmojiPicker = ({ afterSelect }) => {
  const { commands, focus } = useRemirror({ autoUpdate: true });
  const addEmoji = (emoji) => {
    afterSelect();

    commands.insertText(emoji.native);
    focus();
  };
  const setCardSettings = useSetCardSettings();
  return (
    <div
    // onMouseEnter={() => setCardSettings(id, { normalScroll: true })}
    // onMouseLeave={() => setCardSettings(id, { normalScroll: false })}
    >
      <Picker native={true} onSelect={addEmoji} />
    </div>
  );
};
