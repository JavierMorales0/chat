import IndexImage2 from './assets/illustrations/undraw_personal_opinions_re_qw29.svg';
import { Button } from 'primereact/button';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import IndexIndicator from './components/index.indicator.component';
function App() {
  const [positionChatBtn, setPositionChatBtn] = useState(null);
  const refChatButton = useRef(null);
  useEffect(() => {
    setPositionChatBtn(refChatButton.current.getBoundingClientRect());
  }, []);

  return (
    <div>
      <div
        className="w-100 h-screen d-flex flex-column flex-md-row 
          justify-content-around align-items-center px-2 px-md-0">
        <article className="px-2 _w-50 mb-5 mb-md-0 _minh-25  d-flex flex-column justify-content-between align-items-center">
          <div className="_text-xlarge _ls-smallest _h-100 _text-primary">
            <Typewriter
              options={{
                strings: [
                  'Hello everyone!',
                  'Do you want to see something amazing?',
                  "Let's CHAT!",
                ],
                autoStart: true,
                loop: true,
                cursor: '|',
                delay: 70,
                deleteSpeed: 30,
              }}
            />
          </div>

          <Link to="/chat" className="_link">
            <Button
              label="Chat now!"
              icon="pi pi-comment"
              ref={refChatButton}
            />
          </Link>
        </article>
        {positionChatBtn && (
          <IndexIndicator positionChatBtn={positionChatBtn} />
        )}
      </div>
      <div
        className="w-100 h-screen d-flex flex-column flex-md-row 
        justify-content-around align-items-center _bg-primary px-2 px-md-0">
        <motion.img
          whileTap={{ scale: 1.2 }}
          whileHover={{ scale: 0.8 }}
          transition={{ duration: 0.5 }}
          src={IndexImage2}
          className="_w-25 px-5 px-md-0"
          alt="Illustration of a person holding a text message"
        />
        <div className="d-flex flex-column justify-content-center align-items-start _w-50 px-5 px-lg-0">
          <p className=" _text-medium _font-bold">
            Don&apos;t worry how it costs... I&apos;m free
          </p>
          <p className="_text-small _justify _text-secondary mb-1">
            This is a non paid project wishing to create a platform to show my
            capatibilities to design and code a really helpful chat. I hope that
            your stay is pleasant and that you enjoy all my work and dedication.
            With love...
          </p>
          <a
            href="https://www.linkedin.com/in/javier-morales-melara"
            target={'_blank'}
            className="_link _reference bg-white _br-1 px-3 py-1"
            rel="noreferrer">
            Javier Morales
          </a>
        </div>
      </div>
    </div>
  );
}
export default App;
