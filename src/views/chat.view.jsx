import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import EmojiPicker from '../components/emoji.picker';
import PanelMembers from '../components/panel.members';
import { Toaster } from 'react-hot-toast';
import notify from '../components/notify';

let _SOCKET = null;

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  // Set the event to execute before exit and also verifying if there is a local storage username
  useEffect(() => {
    beforeExit();
    if (!localStorage.getItem('mome:username')) {
      navigate('/login');
    }
  }, []);
  // Configuration of events on socket
  useEffect(() => {
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
      _SOCKET.off('connect');
      _SOCKET.off('connect_error');
      _SOCKET.off('chat:message');
      _SOCKET.off('chat:actions');
      _SOCKET.off('disconnect');
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
    setMessage('');
    console.log(messages);
  }
  // Disconnect
  function disconnectChat() {
    _SOCKET.disconnect();
    navigate('/');
  }

  function beforeExit() {
    window.addEventListener('unload', disconnectChat, false);
    window.addEventListener('popstate', disconnectChat, false);
  }

  function messageHandler(e) {
    e.preventDefault();
    setMessage(e.target.value);
  }

  function onLogOut() {
    localStorage.removeItem('mome:username');
    localStorage.removeItem('mome:imageUrl');
    localStorage.removeItem('mome:email');
    notify('loading', 'Exiting. See you later! 🤞 ');
    setTimeout(() => {
      disconnectChat();
    }, 1500);
  }
  return (
    <main>
      <Toaster />
      <div className="row m-0">
        <aside className="col-12 col-md-3">
          <PanelMembers onLogoutSuccess={onLogOut} />
        </aside>
        <div className="col-12 col-md-7 _chat-container py-4">
          <div>
            {messages.map((item, index) => {
              return (
                <div key={index}>
                  <p className="_font-bold m-0">{item.username}</p>
                  <p className="m-0">{item.message}</p>
                </div>
              );
            })}
            <InputText
              placeholder="Write the message"
              className="w-100"
              onChange={messageHandler}
              value={message}
            />
            <EmojiPicker message={message} setMessage={setMessage} />
            <Button onClick={sendMessage}>Enviar</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
