import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store'

export type Category = {
  id: number;
  name: string;
};

type State = {
  categories: Category[],
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
};

const initialState: State = {
  categories: [],
  status: 'idle',
  error: null,
};

// export const fetchCategories = createAsyncThunk<Category[]>(
//   'common/fetchCategories',
//   async () => {
//     const res = await fetch('/api/common/categories')
//     if (!res.ok) throw new Error('Failed to fetch categories')
//     return (await res.json()) as Category[]
//   }
// )

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCategoriesLoading: (state) => { state.status = 'loading' },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
      state.status = 'succeeded';
    },
    setCategoriesFailed: (state, action: PayloadAction<string>) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(fetchCategories.pending, state => {
  //       state.status = 'loading'
  //       state.error = null
  //     })
  //     .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
  //       state.categories = action.payload
  //       state.status = 'succeeded'
  //     })
  //     .addCase(fetchCategories.rejected, (state, action) => {
  //       state.status = 'failed'
  //       state.error = action.error.message ?? 'Unknown error'
  //     })
  // },
});

export const { setCategoriesLoading, setCategories, setCategoriesFailed } = commonSlice.actions
export default commonSlice.reducer;

// export const selectCategories = (s: RootState) => s.common.categories
// export const selectCategoriesStatus = (s: RootState) => s.common.status