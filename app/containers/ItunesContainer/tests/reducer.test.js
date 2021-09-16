// import produce from 'immer'
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
});
