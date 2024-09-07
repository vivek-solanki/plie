import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      const event = action.payload;
      if (!state.some((fav) => fav.event_date_id === event.event_date_id)) {
        state.push(event);
      }
    },
    removeFavorite: (state, action) => {
      const eventId = action.payload;
      return state.filter((event) => event.event_date_id !== eventId);
    },
    toggleFavorite: (state, action) => {
      const event = action.payload;
      const isFavorite = state.some(
        (fav) => fav.event_date_id === event.event_date_id
      );
      if (isFavorite) {
        return state.filter((fav) => fav.event_date_id !== event.event_date_id);
      } else {
        state.push(event);
      }
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
