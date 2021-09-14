import { put, call, takeLatest } from 'redux-saga/effects';
import { getArtists } from '@services/itunesApi';
import { itunesContainerTypes, itunesContainerCreators } from './reducer';

const { REQUEST_GET_ARTIST } = itunesContainerTypes;
const { successGetArtist, failureGetArtist } = itunesContainerCreators;

export function* getItunesData(action) {
  const response = yield call(getArtists, action.artistName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetArtist(data));
  } else {
    yield put(failureGetArtist(data));
  }
}

export default function* itunesContainerSaga() {
  yield takeLatest(REQUEST_GET_ARTIST, getItunesData);
}