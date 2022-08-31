// import logo from './logo.svg';
//import Login from './components/login.component';
import IndexImage from './assets/illustrations/undraw_quick_chat_re_bit5.svg';
import IndexImage2 from './assets/illustrations/undraw_personal_opinions_re_qw29.svg';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
function App() {
  animation();
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
            We are a non paid company wishing to create a platform to show our
            capatibilities to design and code a really helpful chat. We hope
            that your stay is pleasant and that you enjoy all our work and
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

function animation() {
  var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 120 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML =
      '.typewrite > .wrap { border-right: 0.05em solid var(--primary)}';
    document.body.appendChild(css);
  };
}

export default App;
