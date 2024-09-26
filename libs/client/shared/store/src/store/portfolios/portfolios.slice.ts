import { LoadingStatusType, PortfolioEntity } from '@avi/global/models';
import { serializeError } from '@avi/client/shared/core';
import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { addPortfolio, fetchPortfolios, patchPortfolio } from '../../data';

export interface PortfoliosState {
  portfolios: PortfolioEntity[] | null;
  loadingStatus: LoadingStatusType;
  error: SerializedError | undefined | null;
}

export const initialState: PortfoliosState = {
  portfolios: [],
  loadingStatus: 'idle',
  error: null,
};

export const loadPortfolioAction = createAsyncThunk<PortfolioEntity[]>(
  'portfolios/loadPortfolios',
  async (_, { rejectWithValue }) => {
    const getPrograms = async () => {
      try {
        const response = await fetchPortfolios();
        return response.data;
      } catch (error) {
        const serializedError = serializeError(error as Error) as SerializedError;
        return rejectWithValue(serializedError);
      }
    };

    return getPrograms();
  }
);

export const addPortfolioAction = createAsyncThunk<PortfolioEntity, PortfolioEntity>(
  'portfolios/addPortfolio',
  async (portfolio: PortfolioEntity, { rejectWithValue }) => {
    const addPortfolioAsync = async () => {
      try {
        const response = await addPortfolio(portfolio);
        return response.data;
      } catch (error) {
        const serializedError = serializeError(error as Error) as SerializedError;
        return rejectWithValue(serializedError);
      }
    };

    return addPortfolioAsync();
  }
);

export const patchPortfolioAction = createAsyncThunk<PortfolioEntity, PortfolioEntity>(
  'portfolios/patchPortfolio',
  async (portfolio: PortfolioEntity, { rejectWithValue }) => {
    const patchPortfolioAsync = async () => {
      try {
        await patchPortfolio(portfolio);
        return portfolio;
      } catch (error) {
        const serializedError = serializeError(error as Error) as SerializedError;
        return rejectWithValue(serializedError);
      }
    };

    return patchPortfolioAsync();
  }
);

export const portfoliosSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadPortfolioAction.pending, (state) => {
      return {
        ...state,
        loadingStatus: 'loading',
      };
    });
    builder.addCase(loadPortfolioAction.fulfilled, (state, action) => {
      return {
        ...state,
        loadingStatus: 'succeeded',
        portfolios: action.payload,
      };
    });
    builder.addCase(loadPortfolioAction.rejected, (state, action) => {
      return {
        ...state,
        loadingStatus: 'failed',
        error: action.error,
      };
    });
    builder.addCase(addPortfolioAction.pending, (state) => {
      return {
        ...state,
        loadingStatus: 'loading',
      };
    });
    builder.addCase(addPortfolioAction.fulfilled, (state, action) => {
      return {
        ...state,
        loadingStatus: 'succeeded',
        portfolios: state.portfolios ? [...state.portfolios, action.payload] : [action.payload],
      };
    });
    builder.addCase(addPortfolioAction.rejected, (state, action) => {
      return {
        ...state,
        loadingStatus: 'failed',
        error: action.error,
      };
    });
    builder.addCase(patchPortfolioAction.pending, (state) => {
      return {
        ...state,
        loadingStatus: 'loading',
      };
    });
    builder.addCase(patchPortfolioAction.fulfilled, (state, action) => {
      return {
        ...state,
        loadingStatus: 'succeeded',
        portfolios: state.portfolios
          ? state.portfolios.map((portfolio) => (portfolio.id === action.payload.id ? action.payload : portfolio))
          : null,
      };
    });
    builder.addCase(patchPortfolioAction.rejected, (state, action) => {
      return {
        ...state,
        loadingStatus: 'failed',
        error: action.error,
      };
    });
  },
});

export default portfoliosSlice.reducer;
