/**
 * Test itunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getArtists, getTrackDetails } from '@app/services/itunesApi';
import customIntl from '@utils/customIntl';
import { apiResponseGenerator } from '@app/utils/testUtils';
import itunesContainerSaga, { getItunesData, getTrackData, trackDetailsSaga } from '../saga';
import { itunesContainerTypes } from '../reducer';
import { translate, setIntl } from '@app/components/IntlGlobalProvider/index';

describe('ItunesContainer saga tests', () => {
  const generator = itunesContainerSaga();
  const trackGenerator = trackDetailsSaga();
  const artistName = 'dp';
  const trackId = '12345';
  let getItunesDataGenerator = getItunesData({ artistName });
  let getTrackDetailsGenerator = getTrackData({ trackId });
  beforeAll(() => {
    setIntl(customIntl());
  });

  it('should start task to watch for REQUEST_GET_ARTIST action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesContainerTypes.REQUEST_GET_ARTIST, getItunesData));
  });

  it('should ensure that the action FAILURE_GET_ARTIST is dispatched when the api call fails', () => {
    const response = getItunesDataGenerator.next().value;
    expect(response).toEqual(call(getArtists, artistName));
    const errorRes = translate('something_went_wrong');
    expect(getItunesDataGenerator.next(apiResponseGenerator(false, errorRes)).value).toEqual(
      put({
        type: itunesContainerTypes.FAILURE_GET_ARTIST,
        error: errorRes
      })
    );
  });
  it('should ensure that the action SUCCESS_GET_ARTISTS is dispatched when api call success', () => {
    getItunesDataGenerator = getItunesData({ artistName });
    const response = getItunesDataGenerator.next().value;
    expect(response).toEqual(call(getArtists, artistName));
    const itunesResponse = {
      resultCount: 1,
      results: [{ artistName: 'dp' }]
    };
    expect(getItunesDataGenerator.next(apiResponseGenerator(true, itunesResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_GET_ARTIST,
        data: itunesResponse
      })
    );
  });

  it('should start task to watch for REQUEST_GET_TRACK_DETAILS action', () => {
    expect(trackGenerator.next().value).toEqual(
      takeLatest(itunesContainerTypes.REQUEST_GET_TRACK_DETAILS, getTrackData)
    );
  });

  it('should ensure that the action FAILURE_GET_TRACK_DETAILS is dispatched when the api call fails', () => {
    getTrackDetailsGenerator = getTrackData({ trackId });
    getTrackDetailsGenerator.next().value;
    const response = getTrackDetailsGenerator.next().value;
    expect(response).toEqual(call(getTrackDetails, trackId));
    const errorRes = translate('something_went_wrong');
    expect(getTrackDetailsGenerator.next(apiResponseGenerator(false, errorRes)).value).toEqual(
      put({
        type: itunesContainerTypes.FAILURE_GET_TRACK_DETAILS,
        error: errorRes
      })
    );
  });
});
