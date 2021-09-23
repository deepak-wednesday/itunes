/*
 *
 * ItunesContainer reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  artistName: null,
  itunesData: {},
  itunesError: null,
  trackId: null,
  trackDetails: {},
  trackError: null
};

export const { Types: itunesContainerTypes, Creators: itunesContainerCreators } = createActions({
  requestGetArtist: ['artistName'],
  successGetArtist: ['data'],
  failureGetArtist: ['error'],
  requestGetTrackDetails: ['trackId'],
  successGetTrackDetails: ['trackDetails'],
  failureGetTrackDetails: ['error'],
  clearTrackDetails: [],
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
      case itunesContainerTypes.REQUEST_GET_TRACK_DETAILS:
        draft.trackId = action.trackId;
        break;
      case itunesContainerTypes.SUCCESS_GET_TRACK_DETAILS:
        draft.trackDetails = action.trackDetails;
        break;
      case itunesContainerTypes.FAILURE_GET_TRACK_DETAILS:
        draft.trackError = action.trackError;
        break;
      case itunesContainerTypes.CLEAR_TRACK_DETAILS:
        draft.trackDetails = {};
        draft.trackId = null;
        break;
    }
  });

export default itunesContainerReducer;
