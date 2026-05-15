import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavoriteItem = {
  id: number;
  title: string;
};

type FavoritesState = {
  items: FavoriteItem[];
};

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const exists = state.items.some(
        item => item.id === action.payload.id
      );

      // 🔥 защита от дублей и NaN
      if (!exists && !isNaN(action.payload.id)) {
        state.items.push(action.payload);
      }
    },

    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;