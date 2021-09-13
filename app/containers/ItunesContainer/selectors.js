import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the itunesContainer state domain
 */

const selectItunesContainerDomain = (state) => state.itunesContainer || initialState;

export const selectItunesContainer = () => createSelector(selectItunesContainerDomain, (substate) => substate);

export const selectItunesData = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'itunesData'));

export const selectItunesError = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'itunesError'));

export const selectItunesName = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'artistName'));

export default selectItunesContainer;
