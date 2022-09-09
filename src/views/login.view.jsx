import { Button } from 'primereact/button';
import { useEffect, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import notify from '../components/notify';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

export default function Login() {
  const navigate = useNavigate();
  const avatarRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('mome:username')) {
      localStorage.removeItem('mome:username');
    }
  }, []);
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GAPI_CLIENT_ID,
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

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
        <form className="d-flex flex-column justify-content-center align-items-center _w-50">
          <section className="w-100 d-flex flex-wrap flex-row justify-content-around align-items-center px-4 py-2">
            <div id="avatar" ref={avatarRef} className="mt-2"></div>
            <div className="d-flex flex-wrap flex-column _w-50">
              <GoogleLogin
                clientId={process.env.REACT_APP_GAPI_CLIENT_ID}
                render={renderProps => (
                  <Button
                    label="Sign in with Google"
                    className="mt-3 w-100 py-1"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  />
                )}
                buttonText="LogIn"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
              />
            </div>
          </section>

          <div className="_text-small _font-bold _ls-smallest mt-2 w-100 _h-50px">
            <Typewriter
              options={{
                strings: [
                  'Sign in with your Google account',
                  'We respect your information',
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

  function onSuccess(res) {
    try {
      if (!res) return;
      const { email, familyName, givenName, imageUrl } = res.profileObj;
      const firstName = givenName.split(' ')[0];
      const lastName = familyName.split(' ')[0];
      localStorage.setItem('mome:username', `${firstName} ${lastName}`);
      localStorage.setItem('mome:imageUrl', imageUrl);
      localStorage.setItem('mome:email', email);
      notify('loading', "Great, Let's go chat!");
      setTimeout(() => {
        navigate('/chat');
      }, 2000);
    } catch (error) {
      return;
    }
  }

  function onFailure(res) {
    console.error(res);
    notify('error', 'There is a problem to login with Google. Try it later!');
  }
}
