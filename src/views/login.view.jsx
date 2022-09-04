import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import { cleanCussWords } from '../assets/language/filter';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('mome:username')) {
      localStorage.removeItem('mome:username');
    }
    console.log('Etnro a use effec');
    return;
  });
  const [username, setUsername] = useState('');
  return (
    <main>
      <Toaster />
      <div className="w-100 h-screen d-flex flex-column justify-content-center align-items-center">
        <p className="_font-bold _text-normal my-0">
          I saw you aren&apos;t logged in
          <span className="m-0 _text-primary _uppercase">yet</span>
        </p>
        <p className="_text-small my-0 text-muted">
          I&apos;m going to help you!
        </p>
        <form
          onSubmit={onLogin}
          className="d-flex flex-column justify-content-center _w-2550">
          <InputText
            type="text"
            className="p-inputtext-sm block mt-3 w-100  text-center py-1"
            placeholder="What's your name?"
            value={username}
            onChange={e => setUsername(cleanCussWords(e.target.value))}
          />
          <Button
            label="It's done"
            className="mt-2 w-100 py-1"
            onClick={onLogin}
          />
          <div className="_text-small _font-bold _ls-smallest mt-2 w-100 _h-50px">
            <Typewriter
              options={{
                strings: [
                  "Don't use cuss words",
                  'Be careful with your personal information',
                  'Spam is not allowed',
                  'Be respectful to others',
                ],
                autoStart: true,
                loop: true,
                cursor: '|',
                delay: 40,
                deleteSpeed: 10,
              }}
            />
          </div>
        </form>
      </div>
    </main>
  );
  function onLogin(event) {
    event.preventDefault();
    // Verify if the username is longer than 0
    if (username.length <= 0) {
      notify('', 'Please, write your name');
      return;
    }
    try {
      localStorage.setItem('mome:username', username);
      notify('loading', "Great, Let's go chat!");
      setTimeout(() => {
        navigate('/chat');
      }, 2000);
    } catch (error) {
      return;
    }
  }
}

/**
 * Notify() is a function that takes in a type and a message and displays a toast
 * notification based on the type and message passed in.
 */
const notify = (type, message) => {
  const options = {
    duration: 2500,
    position: 'top-center',
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#6366f1',
      secondary: '#fff',
    },
    // Aria
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  };
  switch (type) {
    case 'success': {
      toast.success(message, options);
      break;
    }
    case 'loading': {
      toast.loading(message, options);
      break;
    }
    case 'error': {
      toast.error(message, options);
      break;
    }
    default: {
      toast(message, {
        ...options,
        icon: '😅',
      });
    }
  }
};
