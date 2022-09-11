import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function EmojiPickerComponent({ message, setMessage }) {
  const [toogle, setToogle] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  const toogleHandle = () => {
    setToogle(!toogle);
  };
  return (
    <div>
      {!toogle ? (
        <button onClick={toogleHandle}>Moji</button>
      ) : (
        <div>
          <button onClick={toogleHandle}>Hide</button>
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            autoFocusSearch={false}
            lazyLoadEmojis={true}
          />
        </div>
      )}
    </div>
  );
}
