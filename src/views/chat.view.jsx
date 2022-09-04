import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Button } from 'primereact/button';

let _SOCKET = null;

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  // Set the event to execute before exit and also verifying if there is a local storage username
  useEffect(() => {
    beforeExit();
    if (!localStorage.getItem('mome:username')) {
      navigate('/login');
    }
    setUsername(localStorage.getItem('mome:username'));
  });
  // Configuration of events on socket
  useEffect(() => {
    _SOCKET = io(
      'https://jalex-chat.herokuapp.com/chat?nickname=' +
        localStorage.getItem('mome:username')
    );
    /* A listener that will be triggered when the socket is connected. */
    _SOCKET.on('connect', () => console.log('connected'));

    /* A listener that will be triggered when the socket is disconnected. */
    _SOCKET.on('connect_error', () => {
      setTimeout(() => _SOCKET.connect(), 5000);
    });

    /* Listening for a message event. */
    _SOCKET.on('message', message => {
      setMessages([...messages, 'asdasd']);
      console.log(messages, message);
    });

    /* Listening for a action event. */
    _SOCKET.on('chat:actions', action => console.log(action));

    /* Listening for a disconnect event. */
    _SOCKET.on('disconnect', () => console.log('server disconnected'));
    return () => {
      _SOCKET.off();
    };
  }, []);

  // Send message
  function sendMessage(event) {
    event.preventDefault();
    _SOCKET.emit('chat:message', 'Hola a todos');
    setMessages([...messages, 'Hola maricas']);
  }
  // Disconnect
  function disconnectChat(event) {
    event.preventDefault();
    _SOCKET.disconnect();
    navigate('/');
  }
  const BtnLogOut = () => {
    return (
      <Button className="py-1 px-3" onClick={disconnectChat}>
        Cerrar sesi&oacute;n
      </Button>
    );
  };

  function beforeExit() {
    window.addEventListener('unload', disconnectChat, false);
    window.addEventListener('popstate', disconnectChat, false);
  }
  return (
    <main className="_h-screen">
      <nav className="w-100 d-flex justify-content-around align-items-center py-2 px-3">
        <span className="_text-small _font-bold">{username}</span>
        <BtnLogOut />
      </nav>
      <p className="_text-small">Sesion iniciada como {username}</p>
      <Button onClick={sendMessage}>Enviar mensaje defecto</Button>
    </main>
  );
}
