import { signUp, signIn, signOut, getDashboard, getSettings } from '../helpers/firebase';
import { takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import actions from '../actions/index';

function* login(action: AnyAction) {
  const { email, password } = action;
  try {
    const user = yield signIn(email, password);
    actions.loginSuccess({ user });
  } catch (error) {
    console.error(error);
    if (error.code === 'auth/user-not-found') {
      const user = yield signUp(email, password);
      actions.loginSuccess({ user });
    } else {
      actions.loginFail({ error });
    }
  }
}

function* logout() {
  yield signOut();
}

function* fetchDashboard() {
  try {
    const dashboard = (yield getDashboard()).val();
    actions.getDashboardSuccess({ dashboard });
  } catch(error) {
    console.error(error);
    actions.getDashboardFail({ error });
  }
}

function* fetchSettings() {
  try {
    const settings = (yield getSettings()).val();
    actions.getSettingsSuccess({ settings });
  } catch(error) {
    console.error(error);
    actions.getSettingsFail({ error });
  }
}

export default function* watchForActions() {
  yield takeEvery('LOGIN', login);
  yield takeEvery('LOGOUT', logout);
  yield takeEvery('GET_DASHBOARD', fetchDashboard);
  yield takeEvery('GET_SETTINGS', fetchSettings);
}
