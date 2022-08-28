// import logo from './logo.svg';
//import Login from './components/login.component';
import IndexImage from './assets/illustrations/undraw_quick_chat_re_bit5.svg';
//import { Button } from 'primereact/button';
function App() {
  animation();
  return (
    <div>
      <div
        className="w-100 h-screen d-flex flex-column flex-md-row 
          justify-content-around justify-content-md-around align-items-center">
        <article className="w-50 mb-5 mb-md-0 _minh-25">
          <h1>
            <a
              href=""
              className="typewrite _text-xlarge _ls-smallest"
              data-period="1500"
              data-type='[ "Hello everyone!", "Do you want to see something amazing?", "Let`s CHAT!" ]'>
              <span className="wrap"></span>
            </a>
          </h1>
        </article>
        <img
          className="w-25"
          src={IndexImage}
          alt="Illustration of a bird chatting"
        />
      </div>
      <div className="w-100 h-screen d-flex justify-content-around align-items-center _bg-primary">
        <p>Hello World, let`s chat!</p>
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
