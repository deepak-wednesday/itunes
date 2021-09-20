// import produce from 'immer'
import { setIntl, translate } from '@components/IntlGlobalProvider';
import customIntl from '@utils/customIntl';
import { itunesContainerReducer, itunesContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ItunesContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(itunesContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the state when an action of REQUEST_GET_ARTIST is dispatched', () => {
    const artistName = 'Deepak';
    const expectedResult = { ...state, artistName };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.REQUEST_GET_ARTIST,
        artistName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the data is present when SUCCESS_GET_ARTIST is dispatched', () => {
    const data = { trackname: 'Bella', artistName: 'Money Hiest' };
    const expectedResult = { ...state, itunesData: data };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SUCCESS_GET_ARTIST,
        data: data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that when an action of type FAILURE_GET_ARTIST is dispatched, the error message is shown', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, itunesError: error };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.FAILURE_GET_ARTIST,
        error
      })
    ).toEqual(expectedResult);
  });
  it('should ensure that trackDetails are cleared when CLEAR_ARTIST is dispatched', () => {
    const expectedResult = { ...state };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.CLEAR_ARTIST
      })
    ).toEqual(expectedResult);
  });
  it('should update the initial state when an action of REQUEST_GET_TRACK_DETAILS is dispatched', () => {
    const trackId = '1234';
    const expectedResult = { ...state, trackId };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.REQUEST_GET_TRACK_DETAILS,
        trackId
      })
    ).toEqual(expectedResult);
  });
  it('should ensure that the data is present when SUCCESS_GET_TRACK_DETAILS is dispatched', () => {
    const data = { trackId: 1234 };
    const expectedResult = { ...state, trackDetails: data };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SUCCESS_GET_TRACK_DETAILS,
        trackDetails: data
      })
    ).toEqual(expectedResult);
  });
  it('should ensure that when an action of type FAILURE_GET_TRACK_DETAILS is dispatched, the error message is shown', () => {
    setIntl(customIntl());
    const trackDetails = {};
    const error = translate('something_went_wrong');
    const expectedResult = { ...state, trackError: error, trackDetails };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.FAILURE_GET_TRACK_DETAILS,
        trackError: error
      })
    ).toEqual(expectedResult);
  });
  it('should ensure when CLEAR_TRACK_DETAILS is dispatched , it clears the trackDetails', () => {
    const expectedResult = { ...state, trackDetails: {} };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.CLEAR_TRACK_DETAILS
      })
    ).toEqual(expectedResult);
  });
});
