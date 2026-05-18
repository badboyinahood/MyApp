import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FavoriteItem = {
  price: number;
  id: number;
  title: string;
  location: string;
  date: string;
  image: string;
  description: string;
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

      // защита от дублей
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