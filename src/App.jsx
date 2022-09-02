// import logo from './logo.svg';
//import Login from './components/login.component';
import IndexImage from './assets/illustrations/undraw_quick_chat_re_bit5.svg';
import IndexImage2 from './assets/illustrations/undraw_personal_opinions_re_qw29.svg';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import animation from './assets/animations/writter.animation';
function App() {
  useEffect(() => {
    animation();
  });
  return (
    <div>
      <div
        className="w-100 h-screen d-flex flex-column flex-md-row 
          justify-content-around align-items-center px-2 px-md-0">
        <article className="px-2 _w-50 mb-5 mb-md-0 _minh-25  d-flex flex-column justify-content-between align-items-center">
          <h1 className="">
            <a
              href=""
              className="typewrite _text-xlarge _ls-smallest _h-100"
              data-period="1500"
              data-type='[ "Hello everyone!", "Do you want to see 
                something amazing?", "Let&apos;s CHAT!" ]'>
              <span className="wrap"></span>
            </a>
          </h1>
          <Link to="/chat" className="_link">
            <Button label="Chat now!" icon="pi pi-comment" />
          </Link>
        </article>
        <img
          className="_w-25"
          src={IndexImage}
          alt="Illustration of a bird chatting"
        />
      </div>
      <div
        className="w-100 h-screen d-flex flex-column flex-md-row 
        justify-content-around align-items-center _bg-primary px-2 px-md-0">
        <img
          src={IndexImage2}
          className="_w-25"
          alt="Illustration of a person holding a text message"
        />
        <div className="d-flex flex-column justify-content-center align-items-start _w-50">
          <p className=" _text-medium _font-bold _uppercase">
            Don&apos;t worry how it costs... I&apos;m free
          </p>
          <p className="_text-small _justify _text-secondary mb-1">
            This is a non paid project wishing to create a platform to show my
            capatibilities to design and code a really helpful chat. I really
            hope that your stay is pleasant and that you enjoy all my work and
            dedication. With love...
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
