/**
 * Test itunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getArtists, getTrackDetails } from '@app/services/itunesApi';
import customIntl from '@utils/customIntl';
import { apiResponseGenerator } from '@app/utils/testUtils';
import itunesContainerSaga, { getItunesData, getTrackData } from '../saga';
import { itunesContainerTypes } from '../reducer';
import { translate, setIntl } from '@app/components/IntlGlobalProvider/index';
import { selectItunesData } from '../selectors';

describe('ItunesContainer saga tests', () => {
  const generator = itunesContainerSaga();
  const artistName = 'dp';
  let getItunesDataGenerator = getItunesData({ artistName });

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
});
describe('ItunesContainer getTrackDetails saga tests', () => {
  let trackGenerator;
  let trackId = '1234';
  let getTrackDetailsGenerator = getTrackData({ trackId });
  beforeEach(() => {
    trackGenerator = itunesContainerSaga();
    trackId = '1234';
    getTrackDetailsGenerator = getTrackData({ trackId });
  });

  it('should start task to watch for REQUEST_GET_TRACK_DETAILS action', () => {
    trackGenerator.next();
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
  it('should ensure that the action SUCCESS_GET_TRACK_DETAILS is dispatched when api call success', () => {
    const response = getTrackDetailsGenerator.next().value;
    const value = select(selectItunesData());
    expect(JSON.stringify(response)).toEqual(JSON.stringify(value));
    const data = {
      resultCount: 1,
      results: [{ trackDetails: '1234' }]
    };
    getTrackDetailsGenerator.next();
    expect(getTrackDetailsGenerator.next(apiResponseGenerator(true, data)).value).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_GET_TRACK_DETAILS,
        trackDetails: data.results[0]
      })
    );
  });
  it('should find and use the trackCache', () => {
    getTrackDetailsGenerator.next();
    const res = getTrackDetailsGenerator.next({
      results: [
        {
          trackId: 1234,
          data: 'dp'
        }
      ]
    }).value;
    expect(res).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_GET_TRACK_DETAILS,
        trackDetails: {
          trackId: 1234,
          data: 'dp'
        }
      })
    );
  });
});
