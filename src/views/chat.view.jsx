import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
//import EmojiPicker from '../components/emoji.picker';
import PanelProfile from '../components/panel.profile';
import { Toaster } from 'react-hot-toast';
import notify from '../components/notify';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import moment from 'moment';

let _SOCKET = null;

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState({
    id: -1,
    status: false,
  });
  const divScrollRef = useRef(null);
  // Set the event to execute before exit and also verifying if there is a local storage username
  useEffect(() => {
    beforeExit();
    if (!localStorage.getItem('mome:username')) {
      navigate('/login');
    }
  }, []);

  // Configuration of events on socket
  useEffect(() => {
    _SOCKET = io(process.env.REACT_APP_API_URL + '/chat');
    /* A listener that will be triggered when the socket is connected. */
    _SOCKET.on('connect', () => {
      // Get the credentials data from localstorage
      const username = localStorage.getItem('mome:username');
      const email = localStorage.getItem('mome:email');
      const avatar = localStorage.getItem('mome:imageUrl');

      _SOCKET.emit('chat:login', {
        username,
        email,
        avatar,
      });
    });

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
    _SOCKET.on('chat:actions', chatAction => {
      setMessages(list => [...list, { ...chatAction, type: 'action' }]);
    });

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
  useEffect(() => {
    divScrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  // Receive message
  function receiveMessage(chatMessage) {
    setMessages(list => [
      ...list,
      { ...chatMessage, type: 'message', action: 'receive' },
    ]);
  }
  // Send message
  function sendMessage(event) {
    event.preventDefault();
    if (message == '') {
      notify('warning', 'Please, write a message!');
      return;
    }
    _SOCKET.emit('chat:message', { message, date: moment().toISOString() });
    setMessages(list => [
      ...list,
      {
        username: 'Me',
        message,
        type: 'message',
        action: 'send',
        date: moment().toISOString(),
      },
    ]);
    setMessage('');
  }
  // Disconnect
  function onDisconnect() {
    _SOCKET.disconnect();
    navigate('/');
  }

  function beforeExit() {
    window.addEventListener('unload', onDisconnect, false);
    window.addEventListener('popstate', onDisconnect, false);
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
      onDisconnect();
    }, 1500);
  }

  const sendedMessagesStyle = ' _bg-gray ';
  const sendedStyle = 'ms-auto text-end px-2 py-1 rounded-2 ';
  const receivedStyle = 'text-start px-2 py-1 rounded-2 ';
  const usernameStyle = '_font-bold';
  const receivedMessagesStyle = '_bg-primary-05 ';
  const usernameDisplay = item => {
    return (
      <motion.p
        layout
        className={
          item.action === 'send'
            ? sendedStyle + usernameStyle
            : receivedStyle + usernameStyle
        }
        style={{ width: 'fit-content', marginBottom: '0px' }}>
        {item.action === 'receive' && (
          <img
            src={item.avatar}
            alt="Profile picture"
            referrerPolicy="no-referrer"
            className="_avatar-min me-2"
          />
        )}

        {item.username}
      </motion.p>
    );
  };
  const messageDisplay = (item, index) => {
    const toggleOpen = () =>
      setIsOpen({
        id: index,
        status: isOpen.id == index ? !isOpen.status : true,
      });
    return (
      <AnimateSharedLayout>
        <motion.div
          layout
          className={
            item.action === 'send'
              ? sendedStyle + sendedMessagesStyle
              : receivedStyle + receivedMessagesStyle
          }
          style={{
            width: 'fit-content',
            marginBottom: '5px',
            minWidth: '150px',
          }}
          onClick={toggleOpen}
          initial={{ borderRadius: 10 }}>
          <motion.p layout className="m-0">
            {item.message}
          </motion.p>
          <AnimatePresence>
            {isOpen?.id == index && isOpen?.status && (
              <ContentMessage date={item.date} />
            )}
          </AnimatePresence>
        </motion.div>
      </AnimateSharedLayout>
    );
  };

  function ContentMessage({ date }) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <p className="m-0 _text-xxsmall">{moment(date).fromNow()}</p>
      </motion.div>
    );
  }

  return (
    <div>
      <Toaster />
      <main className="h-screen row w-100">
        <PanelProfile onLogoutSuccess={onLogOut} onDisconnect={onDisconnect} />
        <div className=" col-12 col-md-9 py-4  _chat-container d-flex flex-column align-items-center justify-content-start">
          <div
            className="w-100 px-1"
            style={{ height: '85%', overflowY: 'auto', cursor: 'pointer' }}>
            {messages.map((item, index) => {
              if (item.type == 'message') {
                return (
                  <motion.div
                    layout
                    key={index}
                    className="d-block ms-auto w-100 rounded-2">
                    {
                      // IF INDEX IS 0 OR LESS, IT NEEDS TO PRINT THE USERNAME
                      index <= 0 && usernameDisplay(item)
                    }
                    {
                      // IF INDEX IS MORE THAN 0 HAVE TO COMPARE QITH THE
                      // LAST USERNAME TO PRINT IT AGAIN OR NOT
                      index > 0 &&
                        messages[index - 1].username != item.username &&
                        usernameDisplay(item)
                    }
                    {
                      // DISPLAY THE MESSAGE
                      messageDisplay(item, index)
                    }
                  </motion.div>
                );
              }
              return (
                <motion.div
                  layout
                  key={index}
                  className="_text-xxsmall w-100 text-center my-1">
                  <span className="_font-bold">🤖 {item.message}</span>
                </motion.div>
              );
            })}
            <div ref={divScrollRef}></div>
          </div>
          <div
            className="w-100 d-flex align-items-center justify-content-between gap-1 _font-bold"
            style={{ height: '15%' }}>
            <InputText
              placeholder="Write the message"
              className="w-75"
              onChange={messageHandler}
              value={message}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  sendMessage(event);
                }
              }}
              autoFocus={true}
            />
            {/*<EmojiPicker message={message} setMessage={setMessage} />*/}
            <Button
              className="text-center"
              label="Enviar"
              onClick={sendMessage}
              style={{ minWidth: '150px' }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
