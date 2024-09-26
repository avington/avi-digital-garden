import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

export const selectSettings = createSelector(
  (root: RootState) => root?.settings,
  (settings) => settings?.settings
);

export const selectBaseApiUrl = createSelector(selectSettings, (settings) => settings?.baseApiUrl);
