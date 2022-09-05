import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState, useEffect, useRef } from 'react';
import { cleanCussWords } from '../assets/language/filter';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import avatarGenerator from 'animal-avatar-generator';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(_DEFAULT_AVATAR);
  const avatarRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('mome:username')) {
      localStorage.removeItem('mome:username');
    }
  }, []);

  useEffect(() => {
    avatarRef.current.innerHTML = avatar;
  }, [avatarRef]);

  return (
    <main>
      <Toaster />
      <div className="w-100 h-screen d-flex flex-column justify-content-center align-items-center">
        <p className="_font-bold _text-large my-0">
          I saw you aren&apos;t logged in
          <span className="m-0 _text-primary _uppercase">yet</span>
        </p>
        <p className="_text-normal my-0 text-muted">
          I&apos;m going to help you!
        </p>
        <form
          onSubmit={onLogin}
          className="d-flex flex-column justify-content-center align-items-center _w-50">
          <section className="w-100 d-flex flex-wrap flex-row justify-content-around align-items-center px-4 py-2">
            <div id="avatar" ref={avatarRef} className="mt-2"></div>
            <div className="d-flex flex-wrap flex-column _w-50">
              <InputText
                type="text"
                className="p-inputtext-sm block mt-3 w-100  text-center py-1"
                placeholder="What's your name?"
                value={username}
                onChange={onInputChangeHandler}
              />
              <Button
                label="It's done"
                className="mt-3 w-100 py-1"
                onClick={onLogin}
              />
            </div>
          </section>

          <div className="_text-small _font-bold _ls-smallest mt-2 w-100 _h-50px">
            <Typewriter
              options={{
                strings: [
                  "You'll get a default avatar by username",
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

  function onInputChangeHandler(e) {
    const value = e.target.value;
    setAvatar(() =>
      avatarGenerator(value, {
        size: 100,
        blackout: false,
        backgroundColors: ['#dddddd'],
      })
    );
    avatarRef.current.innerHTML = avatar;
    setUsername(cleanCussWords(value));
  }

  function onLogin(event) {
    event.preventDefault();
    // Verify if the username is longer than 0
    if (username.length <= 0) {
      notify('', 'Please, write your name');
      return;
    }
    try {
      localStorage.setItem('mome:username', username);
      localStorage.setItem('mome:avatar', avatar);
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

const _DEFAULT_AVATAR = `<svg
xmlns="http://www.w3.org/2000/svg"
version="1.1"
width="100"
height="100"
viewBox="0 0 500 500"
>

<rect
width="500"
height="500"
rx="250"
fill="#dddddd"
/>

<path fill="#ec8a90" d="M440.7 280.2c0 6.7-.4 13.1-1.2 19.2-1.1 7.9-2.9 15.2-5.3 21.9a86.3 86.3 0 01-20.7 32.6C393 374.3 362 385.2 325 390.6c-23 3.3-48.3 4.5-74.9 4.5a529 529 0 01-75-4.6c-68-9.8-115.7-38.4-115.7-110.3 0-96.3 85.4-174.3 190.7-174.3 95.7 0 175 64.4 188.6 148.3a161 161 0 012.1 26z"/>

<path fill="#ffa8ae" d="M156 387.1c-57.8-12.3-96.7-42-96.7-107 0-9.4.8-18.6 2.4-27.6 19.1 3.4 39.3 17 53.6 38.1a105 105 0 015 8.2 73.6 73.6 0 0021 23.8c4.9 3.6 9.5 8.3 13.3 14 12.3 18.2 12.6 40 1.3 50.5z"/>

<path fill="#ec8a90"  d="M156.6 128.2c-21.3 11-40 25.5-55.1 42.6v.1l-.2.2-.2.1-1.6-88.7s1.8 0 5 1.2h.1c5 2 13.2 7.2 23.1 20.7a76.1 76.1 0 0028.9 23.8zM343.4 128.2c21.2 11 40 25.5 55.1 42.6v.1l.2.2.2.1 1.6-88.7s-1.8 0-5 1.2h-.1c-5 2-13.2 7.2-23.1 20.7a76.1 76.1 0 01-28.9 23.8z"/>
<path fill="#fec3aa" d="M109.3 160.3c-2.9 3.4-5.4 6.9-7.8 10.5v.1l-.2.2-.2.1c-1 0-6.3-1-23.7-16a46.1 46.1 0 01-13-56.8c5.9-11.9 24-22 40.2-14.7a36.2 36.2 0 0115.8 14.9c12.2 20-1.5 47-11.2 61.7zM390.7 160.3c2.9 3.4 5.4 6.9 7.8 10.5v.1l.2.2.1.1c1.1 0 6.4-1 23.7-16a46.1 46.1 0 0013.1-56.8c-5.9-11.9-24-22-40.2-14.7a36.2 36.2 0 00-15.8 14.9c-12.2 20 1.5 47 11.1 61.7z"/>

<path fill="#ce6c72" d="M305.2 329c0 25-24.7 45.2-55.2 45.2S194.8 354 194.8 329c0-14 7.7-26.5 20-34.8 3.6 4.6 9 7.5 14.6 10.4-8.2-6.1-12-11.5-13.6-16.5-.4-1.4-.7-2.7-.9-4.1-1.3-9.8 2.1-18.6 9.4-21.9 8.4-3.8 19.3 1.4 25.7 11.8 6.4-10.4 17.3-15.6 25.7-11.8 8.4 3.8 11.6 15 8.4 26.4v.2c-1.7 4.8-5.6 10-13.5 16 5.6-3 11-6 14.7-10.5a42.5 42.5 0 0 1 20 34.8z"/>
<path fill="#15212a" d="M243.2 294.8c8-3.7 5-17-2.1-20.8-7.1-3.9-16.9 3-15.5 8.2s12.8 14.8 17.6 12.6zM256.8 294.8c-8-3.7-5-17 2.1-20.8 7.2-3.9 16.9 3 15.5 8.2-1.4 5.2-12.8 14.8-17.6 12.6z"/>
<path fill="#15212a" d="M294.2 338.9l-.5-.1c-28.5-9.9-57-9.7-84.9 0-.6.1-1 .3-1.4-.3-.3-.6 0-1.1.5-1.4 11.3-5.8 25.7-5.8 35.8-9.3a18 18 0 0 1 11.8-.1c9.8 3.3 26.8 3.5 39 9.5.5.3 1 .8.7 1.4-.2.4-.6.3-1 .3z"/>

<circle fill="#15212a" cx="180.11" cy="258.32" r="17.11"/>
<circle fill="#fff" cx="174.66" cy="252.88" r="5.44"/>
<circle fill="#15212a" cx="320.02" cy="258.32" r="17.11"/>
<circle fill="#fff" cx="314.58" cy="252.88" r="5.44"/>

<path fill="#15212a" d="M333 196.7h-.4l-27.6-2.1a5 5 0 01.8-10l27.5 2a5 5 0 01-.3 10zM166.6 196.7h.4l27.5-2.1a5 5 0 00-.7-10l-27.6 2a5 5 0 00.4 10z"/>

</svg>`;
