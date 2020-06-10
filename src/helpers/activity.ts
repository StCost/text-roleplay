import { isOnline } from './utils';
import actions from '../reducers/actions';
import { TStatus } from '../reducers/interfaces';

type TListener = () => void;

interface IListeners {
  online: TListener[],
  afk: TListener[],
  offline: TListener[],
}

const listeners: IListeners = {
  online: [],
  afk: [],
  offline: [],
};

const activityEvents = [
  'mousedown',
  'mousemove',
  'keydown',
  'scroll',
  'touchstart'
];

let prevStatus: string = '';
let lastStatusUpdate: number = 0;

const changeStatus = (status: TStatus, force: boolean = false) => {
  if (!force && prevStatus === status) return;

  const time = Date.now();
  if (!force && time < lastStatusUpdate + 500) return;

  const uid = localStorage.getItem('uid');
  if (!uid) return;

  prevStatus = status;
  lastStatusUpdate = time;
  if (status === 'online')
    actions.updateLastOnline({});
  else
    actions.setUserStatus({ uid, status });
};

const listenForStatus = () => {
  document.onvisibilitychange = () =>
    document.hidden
      ? onBlur()
      : onFocus();

  window.onblur = () =>
    setTimeout(() =>
      !document.hasFocus() && onBlur()
      , 100);

  window.onfocus = () =>
    setTimeout(() =>
      !document.hidden && document.hasFocus() && onFocus()
      , 100);

  window.onbeforeunload = () => {
    onClose();
  }
};

const listenForOnline = () => {
  const callback = () => {
    !document.hidden
    && (
      !isOnline(parseInt(localStorage.getItem('lastActivity') || '0') - 60000)
      ||
      prevStatus !== 'online'
    ) && onFocus(true);
  };

  activityEvents.forEach((eventName) =>
    document.addEventListener(eventName, callback, true)
  );

  if (!document.hidden && document.hasFocus())
    onFocus(true);
  else
    onBlur(true)
};

export const listenForActivity = () => {
  listenForOnline();
  listenForStatus();
};

export const addStatusChangeListener = (status: TStatus, callback: TListener) =>
  listeners[status].push(callback);

export const removeStatusChangeListener = (status: TStatus, callback: TListener) =>
  listeners[status] = listeners[status].filter((cb: TListener) => cb !== callback);

const onFocus = (force: boolean = false) => {
  listeners.online.forEach((cb: TListener) => cb());
  changeStatus('online', force);
};

const onBlur = (force: boolean = false) => {
  listeners.afk.forEach((cb: TListener) => cb());
  changeStatus('afk', force)
};

const onClose = () => {
  listeners.offline.forEach((cb: TListener) => cb());
  changeStatus('offline', true);
};
