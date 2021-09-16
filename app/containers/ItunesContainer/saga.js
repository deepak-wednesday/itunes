import { put, call, takeLatest } from 'redux-saga/effects';
import { getArtists } from '@services/itunesApi';
import { itunesContainerTypes, itunesContainerCreators } from './reducer';
import { translate } from '@app/components/IntlGlobalProvider/index';

const { REQUEST_GET_ARTIST } = itunesContainerTypes;
const { successGetArtist, failureGetArtist } = itunesContainerCreators;

export function* getItunesData(action) {
  const response = yield call(getArtists, action.artistName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetArtist(data));
  } else {
    const errorMsg = data?.originalError?.message ?? translate('something_went_wrong');
    yield put(failureGetArtist(errorMsg));
  }
}

export default function* itunesContainerSaga() {
  yield takeLatest(REQUEST_GET_ARTIST, getItunesData);
}
