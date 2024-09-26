import { SettingsEntity } from '@avi/global/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  settings: SettingsEntity;
}

export const initialSettingsState: SettingsState = {
  settings: {
    baseApiUrl: '',
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialSettingsState,
  reducers: {
    setSettings: (state, action: PayloadAction<SettingsEntity>) => {
      state.settings = action.payload;
    },
    setBaseApiUrl: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          baseApiUrl: action.payload,
        },
      };
    },
  },
});

export const { setSettings, setBaseApiUrl } = settingsSlice.actions;
export default settingsSlice.reducer;
