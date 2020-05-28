import { isOnline } from './utils';
import actions from '../reducers/actions';

let uid = localStorage.getItem('uid');
let prevStatus = '';
let lastStatusUpdate = 0;
const changeStatus = (status: 'online' | 'afk' | 'offline', force: boolean = false) => {
  if (!force && prevStatus === status) return;
  const time = Date.now();
  if (!force && time < lastStatusUpdate + 500) return;
  if (!uid) {
    uid = localStorage.getItem('uid');
    return;
  }

  prevStatus = status;
  lastStatusUpdate = time;

  if (status === 'online') {
    actions.updateLastOnline({});
    return;
  }
  actions.setUserStatus({ uid, status });
};

const listenForStatus = () => {
  document.onvisibilitychange = () =>
    document.hidden
      ? changeStatus('afk')
      : changeStatus('online');

  window.onblur = () =>
    setTimeout(() => {
      if (!document.hasFocus()) {
        changeStatus('afk');
      }
    }, 100);

  window.onfocus = () =>
    setTimeout(() => {
      if (!document.hidden && document.hasFocus()) {
        changeStatus('online');
      }
    }, 100);

  window.onbeforeunload = () => {
    changeStatus('offline', true);
  }
};

const listenForOnline = () => {
  const callback = () => {
    if (
      !document.hidden
      && (
        !isOnline(parseInt(localStorage.getItem('lastActivity') || '0') - 60000)
        ||
        prevStatus !== 'online'
      )
    ) {
      changeStatus('online', true);
    }
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
  if (!document.hidden && document.hasFocus())
    changeStatus('online', true);
  else
    changeStatus('afk', true);
};

export const listenForActivity = () => {
  listenForOnline();
  listenForStatus();
};
