import { isOnline } from "./utils";
import actions from "../reducers/actions";

const listenForOnline = () => {
  const callback = () => {
    if (!isOnline(parseInt(localStorage.getItem('lastActivity') || '0') - 60000))
      actions.updateLastOnline({});
  };

  [
    'mousedown',
    'mousemove',
    'keydown',
    'scroll',
    'touchstart'
  ].forEach((eventName) => {
    document.addEventListener(eventName, callback, true);
  });
  callback();
};

let blinking = false;
export const blinkTitle = () => {
  if (blinking) return;
  blinking = true;

  const interval = setInterval(() => {
    const title = document.head.querySelector('title');
    if (title) {
      title.innerText = title.innerText === 'TRP' ? '(!) TRP' : 'TRP';

      if (!blinking || !document.hidden) {
        title.innerText = 'TRP';
        clearInterval(interval);
        blinking = false;
      }
    }
  }, 500);
};

export const listenForActivity = () => {
  listenForOnline();
};
