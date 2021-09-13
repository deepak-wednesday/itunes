/**
 * Test itunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getArtists } from '@app/services/itunesApi';
import { apiResponseGenerator } from '@app/utils/testUtils';
import itunesContainerSaga, { getItunesData } from '../saga';
import { itunesContainerTypes } from '../reducer';

describe('ItunesContainer saga tests', () => {
  const generator = itunesContainerSaga();
  const artistName = 'dp';
  let getItunesDataGenerator = getItunesData({ artistName });

  it('should start task to watch for REQUEST_GET_ARTIST action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesContainerTypes.REQUEST_GET_ARTIST, getItunesData));
  });

  it('should ensure that the action FAILURE_GET_ARTIST is dispatched when the api call fails', () => {
    const response = getItunesDataGenerator.next().value;
    expect(response).toEqual(call(getArtists, artistName));
    const errorRes = { errorMessage: 'something went wrong!' };
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
