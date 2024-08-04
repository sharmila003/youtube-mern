// selectors.js
import { createSelector } from 'reselect';

const selectAppState = state => state.app || {};

export const selectVideoList = createSelector(
  [selectAppState],
  appState => {
    console.log('Selector appState:', appState);
    return appState.video || [];
  }
);

