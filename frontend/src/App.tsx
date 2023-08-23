import React, { useState } from 'react';
import './App.css';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

function App(): JSX.Element {
  const [chatVisibility, setChatVisibility] = useState<boolean>(false);
  const [socket, setSocket] = useState<any>(null); 

  return (
    <div className="w-[100vw] flex items-center h-[100vh] bg-white justify-center font-[Roboto]">
      {
        chatVisibility ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />
      }
    </div>
  );
}

export default App;
