import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import animation from '../assets/animations/writter.animation';
import { cleanCussWords } from '../assets/language/filter';

export default function Login() {
  useEffect(() => {
    animation();
  });
  const [username, setUsername] = useState('');
  return (
    <main>
      <div className="w-100 h-screen d-flex flex-column justify-content-center align-items-center">
        <p className="_font-bold _text-normal my-0">
          I saw you aren&apos;t logged in{' '}
          <span className="m-0 _text-primary _uppercase">yet</span>
        </p>
        <p className="_text-small my-0 text-muted">
          I&apos;m going to help you!
        </p>
        <InputText
          type="text"
          className="p-inputtext-sm block mt-3 _minw-25 text-center py-1"
          placeholder="What's your name?"
          value={username}
          onChange={e => setUsername(cleanCussWords(e.target.value))}
        />

        <Button label="It's done" className="mt-2 _minw-25 py-1" />
      </div>

      <a
        href=""
        className="fixed-bottom px-3 py-2 typewrite _text-small _ls-smallest "
        data-period="1500"
        data-type='["Don&apos;t use cuss words!", "Be respectful!"]'>
        <span className="wrap"></span>
      </a>
    </main>
  );
}
