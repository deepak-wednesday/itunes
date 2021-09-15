/*
 *
 * ItunesContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = { artistName: null, itunesData: [], itunesError: null };

export const { Types: itunesContainerTypes, Creators: itunesContainerCreators } = createActions({
  requestGetArtist: ['artistName'],
  successGetArtist: ['data'],
  failureGetArtist: ['error'],
  clearArtist: []
});

/* eslint-disable default-case, no-param-reassign */
export const itunesContainerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case itunesContainerTypes.REQUEST_GET_ARTIST:
        draft.artistName = action.artistName;
        break;
      case itunesContainerTypes.CLEAR_ARTIST:
        return initialState;
      case itunesContainerTypes.SUCCESS_GET_ARTIST:
        draft.itunesData = action.data;
        break;
      case itunesContainerTypes.FAILURE_GET_ARTIST:
        draft.itunesError = action.error;
        break;
      default:
        return state;
    }
  });

export default itunesContainerReducer;
