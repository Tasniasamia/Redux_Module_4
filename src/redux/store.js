import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './features/tasks/tasksSlice';
import userSlice from './features/user/userSlice';
import { pokemonApi } from './features/baseApi/api';

const store = configureStore({
  reducer: {
    tasksSlice: tasksSlice,
    userSlice: userSlice,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export default store;
