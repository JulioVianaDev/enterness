import React, { useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface JoinProps {
  setChatVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}

export default function Join({ setChatVisibility, setSocket }: JoinProps): JSX.Element {
  const usernameRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async () => {
    const username = usernameRef.current?.value;
    if (!username?.trim()) return;

    const socket: Socket = io('http://localhost:8080'); 
    socket.emit('set_username', username);
    setSocket(socket);
    setChatVisibility(true);
  };

  return (
    <div className="bg-[#11224B] w-[328px] h-[400px] flex flex-col rounded-[12px]  items-center">
      <h2 className='text-center text-[1.8rem] mt-12 text-white'>Chat em tempo real</h2>
      <div className='mt-12'>
        <input ref={usernameRef} className='rounded pl-2' type="text" placeholder="Nome de usuário" />
      </div>
      <button className=' bg-[#9747FF] w-[120px] h-[30px] rounded-[12px] mt-12 text-white hover:bg-[#975ae7]' onClick={handleSubmit}>Entrar</button>
    </div>
  );
}
