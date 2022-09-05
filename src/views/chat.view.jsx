import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

let _SOCKET = null;

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  // Set the event to execute before exit and also verifying if there is a local storage username
  useEffect(() => {
    beforeExit();
    if (!localStorage.getItem('mome:username')) {
      navigate('/login');
    }
    setUsername(localStorage.getItem('mome:username'));
  }, []);
  // Configuration of events on socket
  useEffect(() => {
    console.log(process.env);
    _SOCKET = io(
      process.env.REACT_APP_API_URL +
        '/chat?username=' +
        localStorage.getItem('mome:username')
    );
    /* A listener that will be triggered when the socket is connected. */
    _SOCKET.on('connect', () => console.log('connected'));

    /* A listener that will be triggered when the socket is disconnected. */
    _SOCKET.on('connect_error', () => {
      setTimeout(() => _SOCKET.connect(), 5000);
    });

    /* Listening for a message event. */
    _SOCKET.on('chat:message', chatMessage => {
      receiveMessage(chatMessage);
      //setMessages([...messages, { nickname, message }]);
    });

    /* Listening for a action event. */
    _SOCKET.on('chat:actions', chatAction => console.log(chatAction));

    /* Listening for a disconnect event. */
    _SOCKET.on('disconnect', () => console.log('server disconnected'));
    return () => {
      _SOCKET.off();
    };
  }, []);
  // Receive message
  function receiveMessage(chatMessage) {
    console.log(chatMessage);
    console.log(messages);
    setMessages(list => [...list, chatMessage]);
  }
  // Send message
  function sendMessage(event) {
    event.preventDefault();
    _SOCKET.emit('chat:message', message);
    setMessages(list => [
      ...list,
      {
        username: 'Me',
        message,
      },
    ]);
    console.log(messages);
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

  function messageHandler(e) {
    e.preventDefault();
    setMessage(e.target.value);
  }
  return (
    <main className="_h-screen">
      <nav className="w-100 d-flex justify-content-around align-items-center py-2 px-3">
        <span className="_text-small _font-bold">{username}</span>
        <BtnLogOut />
      </nav>
      <p className="_text-small">Sesion iniciada como {username}</p>
      <InputText placeholder="Write the message" onChange={messageHandler} />
      <Button onClick={sendMessage}>Enviar</Button>

      {messages.map((item, index) => {
        return (
          <div key={index}>
            <p className="_font-bold m-0">{item.username}</p>
            <p className="m-0">{item.message}</p>
          </div>
        );
      })}
    </main>
  );
}
