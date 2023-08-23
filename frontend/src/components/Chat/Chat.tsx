import React, { useRef, useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import EmojiPicker, {
  EmojiStyle,
  EmojiClickData,
  Emoji,
} from "emoji-picker-react";

interface Message {
  authorId: string;
  author: string;
  text: string;
}

interface ChatProps {
  socket: Socket; 
}

export default function Chat({ socket }: ChatProps): JSX.Element {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const messageRef = useRef<HTMLInputElement | null>(null);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");

  const [inputValue, setInputValue] = useState<string>("");

  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    const newEmote = emojiData.unified;
    setSelectedEmoji(newEmote);

    // Concatenate the selected emoji in the message input
    setInputValue(prevValue => prevValue + newEmote);
    if (messageRef.current) {
      messageRef.current.focus(); // Keep focus on the input field
    }
  }

  useEffect(() => {
    socket.on('receive_message', (data: Message) => {
      setMessageList((current) => [...current, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  useEffect(() => {
    scrollDown();
  }, [messageList]);

  const handleSubmit = () => {
    if (!messageRef.current) return;

    const emoteToInsert = selectedEmoji ? selectedEmoji : '';
    const newMessage = emoteToInsert + messageRef.current.value;

    if (!newMessage.trim()) return;

    socket.emit('message', newMessage);
    clearInput();
    setSelectedEmoji(""); // Clear the selected emoji
    focusInput();
  };


  const clearInput = () => {
    if (messageRef.current) {
      messageRef.current.value = '';
      setInputValue("")
    }
  };

  const focusInput = () => {
    if (messageRef.current) {
      messageRef.current.focus();
    }
  };

  const getEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const scrollDown = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='container mx-auto shadow-lg rounded-lg bg-[#11224B]'>
      <div className={' flex flex-col min-h-[400px]  max-h-[400px] justify-between relative p-4'}>
        <div className="font-semibold text-2xl text-center text-white">Bate Papo</div>
        <div className={'overflow-y-scroll'}>
          
              {messageList.map((message, index) => (
                <div
                  className={`${''} ${
                    message.authorId === socket.id  ? 'mr-auto mt-1 py-1 px-4 bg-blue-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white max-w-[320px] h-auto'
                    : 'ml-auto py-1 mt-1 px-4 bg-gray-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white max-w-[320px] h-auto'
                  }`}
                  key={index}
                >
                  <div className="">
                    <strong>{message.author}</strong>
                  </div>
                  <div className="max-w-[320px]">{message.text}</div>
                </div>
              ))}
          <div ref={bottomRef} />
        </div>
        <div className={' w-full flex mt-2'}>
          <input
            ref={messageRef}
            placeholder="Mensagem"
            onKeyDown={(e) => getEnterKey(e)}
            className={'w-[400px] rounded-[4px] pl-2'}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)} // Update inputValue state on input change
          />
          <button
            className={' bg-[#9747FF] w-[220px] h-[30px] rounded-[12px] text-white hover:bg-[#975ae7] ml-3'}
            onClick={() => handleSubmit()}
          >
            Enviar Mensagem 
          </button>
        </div>
      </div>
      {/* <div className="show-emoji">
        Your selected Emoji is:
        {selectedEmoji ? (
          <Emoji
            unified={selectedEmoji}
            emojiStyle={EmojiStyle.APPLE}
            size={22}
          />
        ) : null}
      </div>

      <EmojiPicker
        onEmojiClick={onClick}
        autoFocusSearch={false}
      /> */}
    </div>
  );
}
