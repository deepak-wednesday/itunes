import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getArtists, getTrackDetails } from '@services/itunesApi';
import { itunesContainerTypes, itunesContainerCreators } from './reducer';
import { translate } from '@app/components/IntlGlobalProvider';
import { selectItunesData } from './selectors';

const { REQUEST_GET_ARTIST, REQUEST_GET_TRACK_DETAILS } = itunesContainerTypes;
const { successGetArtist, failureGetArtist, successGetTrackDetails, failureGetTrackDetails } = itunesContainerCreators;

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

export function* getTrackData(action) {
  const trackData = yield select(selectItunesData());
  const trackCache = trackData?.results?.find((item) => item.trackId === parseInt(action.trackId, 10));
  if (trackCache) {
    yield put(successGetTrackDetails(trackCache));
  } else {
    const response = yield call(getTrackDetails, action.trackId);
    const { data, ok } = response;
    if (ok) {
      yield put(successGetTrackDetails(data.results[0]));
    } else {
      const errorMsg = data?.originalError?.message ?? translate('something_went_wrong');
      yield put(failureGetTrackDetails(errorMsg));
    }
  }
}

export default function* itunesContainerSaga() {
  yield takeLatest(REQUEST_GET_ARTIST, getItunesData);
}

export function* trackDetailsSaga() {
  yield takeLatest(REQUEST_GET_TRACK_DETAILS, getTrackData);
}
