import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import get from 'axios';

interface IYTSSearchResponse {
  movie_count: number;
  limit: number;
  page_number: number;
  movies: any[];
}
export interface IYTSSearchState {
  baseUrl: string;
  page: number | undefined;
  quality: '720p' | '1080p' | '2160p' | '3D' | undefined;
  minimum_rating: number | undefined;
  query_term: string | undefined;
  sort_by:
    | 'title'
    | 'year'
    | 'rating'
    | 'peers'
    | 'seeds'
    | 'download_count'
    | 'like_count'
    | 'date_added'
    | undefined;
  order_by: 'asc' | 'desc' | undefined;
  with_rt_ratings: boolean | undefined;
  searchResponse: IYTSSearchResponse;
  isLoading: boolean;
}

const initialYTSSearchState: IYTSSearchState = {
  baseUrl: 'https://yts.mx/api/v2/list_movies.json?',
  page: undefined,
  quality: undefined,
  minimum_rating: undefined,
  query_term: undefined,
  sort_by: undefined,
  order_by: undefined,
  with_rt_ratings: undefined,
  searchResponse: {
    movie_count: 0,
    limit: 0,
    page_number: 0,
    movies: []
  },
  isLoading: false
};

export const ytsSearch = createAsyncThunk(
  'ytsSearch',
  async (payload, thunkAPI) => {
    const state: IYTSSearchState = (thunkAPI.getState() as any)
      .yts as IYTSSearchState;
    const url =
      state.baseUrl +
      ((state.page ? `&page=${state.page}` : '') +
        (state.quality ? `&quality=${state.quality}` : '') +
        (state.minimum_rating
          ? `&minimum_rating=${state.minimum_rating}`
          : '') +
        (state.query_term ? `&query_term=${state.query_term}` : '') +
        (state.sort_by ? `&sort_by=${state.sort_by}` : '') +
        (state.order_by ? `&order_by=${state.order_by}` : '') +
        (state.with_rt_ratings
          ? `&with_rt_ratings=${state.with_rt_ratings}`
          : ''));
    const response = await get(url);

    return response;
  }
);

const ytsSlice = createSlice({
  name: 'YTS',
  initialState: initialYTSSearchState,
  reducers: {
    setSearchPage: (state, action: PayloadAction<IYTSSearchState['page']>) => {
      state.page = action.payload;
    },
    setSearchQuality: (
      state,
      action: PayloadAction<IYTSSearchState['quality']>
    ) => {
      state.quality = action.payload;
    },
    setSearchMinimumRating: (
      state,
      action: PayloadAction<IYTSSearchState['minimum_rating']>
    ) => {
      state.minimum_rating = action.payload;
    },
    setSearchQueryTerm: (
      state,
      action: PayloadAction<IYTSSearchState['query_term']>
    ) => {
      state.query_term = action.payload;
    },
    setSearchSortBy: (
      state,
      action: PayloadAction<IYTSSearchState['sort_by']>
    ) => {
      state.sort_by = action.payload;
    },
    setSearchOrderBy: (
      state,
      action: PayloadAction<IYTSSearchState['order_by']>
    ) => {
      state.order_by = action.payload;
    },
    setSearchIsWithRtRatings: (
      state,
      action: PayloadAction<IYTSSearchState['with_rt_ratings']>
    ) => {
      state.with_rt_ratings = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(ytsSearch.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(ytsSearch.rejected, (state) => {
        state.isLoading = false;
      });

    builder.addCase(ytsSearch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.searchResponse = action.payload.data.data;
      console.log('act', action.payload.data.data);
    });
  }
});

export const {
  setSearchIsWithRtRatings,
  setSearchMinimumRating,
  setSearchOrderBy,
  setSearchPage,
  setSearchQuality,
  setSearchQueryTerm,
  setSearchSortBy
} = ytsSlice.actions;

export default ytsSlice.reducer;
